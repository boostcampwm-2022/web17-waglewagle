package com.waglewagle.rest.user.service;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.community.entity.CommunityUser;
import com.waglewagle.rest.community.repository.CommunityUserRepository;
import com.waglewagle.rest.user.data_object.dto.request.UserRequest;
import com.waglewagle.rest.user.data_object.dto.response.UserResponse;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CommunityUserRepository communityUserRepository;

    @Transactional
    public Long
    authenticateWithUsername(final String username) {
        Long userId = userRepository.findOrSaveUsername(username);
        return userId;
    }

    public Cookie
    createUserIdCookie(final Long userId) {
        Cookie userIdCookie = new Cookie("user_id", Long.toString(userId));
        userIdCookie.setMaxAge(3600 * 1000);
        userIdCookie.setPath("/");
        userIdCookie.setHttpOnly(true);
//        userIdCookie.setSecure(true);
        return userIdCookie;
    }

    @Transactional
    public PreResponseDTO<UserResponse.UpdateProfileDTO>
    updateUserProfile(final Long userId,
                      final UserRequest.UpdateProfileDTO updateProfileDTO) throws IllegalArgumentException {

        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        if (Objects.isNull(user)) return null;

        String username = updateProfileDTO.getUsername();
        if (username != null) {
            boolean isUsedUsername = userRepository
                    .findByUsername(username)
                    .filter(user1 -> !Objects.equals(user.getId(), userId))
                    .isPresent();

            if (isUsedUsername) {
                return new PreResponseDTO("이미 사용중인 이름입니다.", HttpStatus.BAD_REQUEST);
            }
        }

        user.updateProfile(updateProfileDTO);

        return new PreResponseDTO<>(UserResponse.UpdateProfileDTO.of(user), HttpStatus.OK);
    }

    @Transactional
    public PreResponseDTO<UserResponse.UserInfoDTO>
    getUserInfo(final Long userId,
                final Long communityId) throws IllegalArgumentException {
        try {
            User user = userRepository
                    .findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않은 회원입니다."));

            if (communityId == null) {
                return new PreResponseDTO<>(UserResponse.UserInfoDTO.of(user), HttpStatus.OK);
            }

            CommunityUser communityUser = communityUserRepository.findByUserIdAndCommunityId(userId, communityId);
            if (communityUser == null) {
                return new PreResponseDTO<>(null, HttpStatus.UNAUTHORIZED);
            }

            return new PreResponseDTO<>(UserResponse.UserInfoDTO.from(user, communityUser), HttpStatus.OK);

        } catch (IllegalArgumentException e) {
            return new PreResponseDTO<>(null, HttpStatus.FORBIDDEN);
        }


    }

    @Transactional
    public void
    updateLastActivity(final Long userId) throws IllegalArgumentException {
        userRepository
                .findById(userId)
                .orElseThrow(
                        () -> new IllegalArgumentException("존재하지 않은 회원입니다.")
                )
                .updateLastActivity();
    }

    public List<UserResponse.LastActivityDTO>
    getUserInfoInKeyword(final Long keywordId) {
        return userRepository
                .findByKeywordUserKeywordId(keywordId)
                .stream()
                .map(UserResponse.LastActivityDTO::of)
                .collect(Collectors.toList());
    }

    public List<UserResponse.LastActivityDTO>
    getUserInfoInCommunity(final Long communityId) {
        return userRepository
                .findByCommunityUserCommunityId(communityId)
                .stream()
                .map(UserResponse.LastActivityDTO::of)
                .collect(Collectors.toList());
    }

}
