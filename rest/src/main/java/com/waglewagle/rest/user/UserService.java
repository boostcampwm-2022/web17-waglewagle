package com.waglewagle.rest.user;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.communityUser.CommunityUser;
import com.waglewagle.rest.communityUser.repository.CommunityUserRepository;
import com.waglewagle.rest.user.dto.UpdateProfileDTO;
import com.waglewagle.rest.user.dto.UpdateProfileResponseDTO;
import com.waglewagle.rest.user.dto.UserConnectionStatusDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.waglewagle.rest.user.dto.UserInfoDTO.*;

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

    Cookie createUserIdCookie(Long userId) {
        Cookie userIdCookie =new Cookie("user_id", Long.toString(userId));
        userIdCookie.setMaxAge(3600 * 1000);
        userIdCookie.setPath("/");
        userIdCookie.setHttpOnly(true);
//        userIdCookie.setSecure(true);
        return userIdCookie;
    }

    @Transactional
    public PreResponseDTO<UpdateProfileResponseDTO> updateUserProfile(Long userId,
                                                                      UpdateProfileDTO updateProfileDTO) {

        User user = userRepository.findById(userId);
        if (Objects.isNull(user)) return null;

        String username = updateProfileDTO.getUsername();
        if (username != null) {
            User existingUser = userRepository.findByUsername(username);
            if (existingUser != null && existingUser.getId() != userId ) {
                return new PreResponseDTO(null, HttpStatus.BAD_REQUEST);
            }
        }

        user.updateProfile(updateProfileDTO);

        return new PreResponseDTO(new UpdateProfileResponseDTO(user), HttpStatus.OK);
    }

    @Transactional
    public PreResponseDTO<UserInfoResDTO> getUserInfo(Long userId, Long communityId) {
        User user = userRepository.findById(userId);

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
    public void updateLastActivity(Long userId) {
        User user = userRepository.findById(userId);

        user.updateLastActivity();
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
    public User getUser(Long userId) {
        return userRepository.findById(userId);
    }
}
