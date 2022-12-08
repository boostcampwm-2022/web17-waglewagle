package com.waglewagle.rest.user.service;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.community.entity.CommunityUser;
import com.waglewagle.rest.community.repository.CommunityUserRepository;
import com.waglewagle.rest.user.data_object.dto.UpdateProfileDTO;
import com.waglewagle.rest.user.data_object.dto.UpdateProfileResponseDTO;
import com.waglewagle.rest.user.data_object.dto.UserConnectionStatusDTO;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.waglewagle.rest.user.data_object.dto.UserInfoDTO.UserInfoResDTO;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CommunityUserRepository communityUserRepository;

    @Transactional
    public Long authenticateWithUsername(String username) {
        Long userId = userRepository.findOrSaveUsername(username);
        return userId;
    }

    public Cookie createUserIdCookie(Long userId) {
        Cookie userIdCookie = new Cookie("user_id", Long.toString(userId));
        userIdCookie.setMaxAge(3600 * 1000);
        userIdCookie.setPath("/");
        userIdCookie.setHttpOnly(true);
//        userIdCookie.setSecure(true);
        return userIdCookie;
    }

    @Transactional
    public PreResponseDTO<UpdateProfileResponseDTO> updateUserProfile(Long userId,
                                                                      UpdateProfileDTO updateProfileDTO) throws IllegalArgumentException {

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        if (Objects.isNull(user)) return null;

        String username = updateProfileDTO.getUsername();
        if (username != null) {
            boolean isUsedUsername = userRepository.findByUsername(username)
                    .filter(user1 -> !Objects.equals(user.getId(), userId))
                    .isPresent();

            if (isUsedUsername) {
                return new PreResponseDTO("이미 사용중인 이름입니다.", HttpStatus.BAD_REQUEST);
            }
        }

        user.updateProfile(updateProfileDTO);

        return new PreResponseDTO<>(new UpdateProfileResponseDTO(user), HttpStatus.OK);
    }

    @Transactional
    public PreResponseDTO<UserInfoResDTO> getUserInfo(Long userId, Long communityId) throws IllegalArgumentException {
        User user;
        Optional<User> optUser = userRepository.findById(userId);
        if (optUser.isPresent()) {
            user = optUser.get();
        } else {
            return new PreResponseDTO("존재하지 않는 회원입니다.", HttpStatus.NOT_FOUND);
        }

        if (communityId == null) {
            return new PreResponseDTO<>(new UserInfoResDTO(user), HttpStatus.OK);
        }

        CommunityUser communityUser = communityUserRepository
                .findByUserIdAndCommunityId(userId, communityId);

        if (communityUser == null) {
            return new PreResponseDTO<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new PreResponseDTO<>(new UserInfoResDTO(user, communityUser), HttpStatus.OK);
    }

    @Transactional
    public void updateLastActivity(Long userId) throws IllegalArgumentException {

        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않은 회원입니다."))
                .updateLastActivity();
    }

    public List<UserConnectionStatusDTO> getUserInfoInKeyword(Long keywordId) {
        return userRepository
                .findByKeywordUserKeywordId(keywordId)
                .stream()
                .map(UserConnectionStatusDTO::of)
                .collect(Collectors.toList());
    }

    public List<UserConnectionStatusDTO> getUserInfoInCommunity(Long communityId) {
        return userRepository
                .findByCommunityUserCommunityId(communityId)
                .stream()
                .map(UserConnectionStatusDTO::of)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public User getUser(Long userId) throws IllegalArgumentException {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
    }
}
