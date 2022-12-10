package com.waglewagle.rest.user.service;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.community.entity.CommunityUser;
import com.waglewagle.rest.community.exception.NoSuchCommunityException;
import com.waglewagle.rest.community.repository.CommunityRepository;
import com.waglewagle.rest.community.repository.CommunityUserRepository;
import com.waglewagle.rest.user.data_object.dto.request.UserRequest;
import com.waglewagle.rest.user.data_object.dto.response.UserResponse;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.exception.DuplicatedUsernameException;
import com.waglewagle.rest.user.exception.NoSuchUserException;
import com.waglewagle.rest.user.exception.UnauthorizedException;
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


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CommunityUserRepository communityUserRepository;
    private final CommunityRepository communityRepository;

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
                .orElseThrow(NoSuchUserException::new);

        String username = updateProfileDTO.getUsername();

        if (username != null) {
            userRepository
                    .findByUsername(username)
                    .filter(user1 -> !Objects.equals(user.getId(), userId))
                    .ifPresent((__) -> {
                        throw new DuplicatedUsernameException();
                    });
        }

        user.updateProfile(updateProfileDTO);

        return new PreResponseDTO<>(UserResponse.UpdateProfileDTO.of(user), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public PreResponseDTO<UserResponse.UserInfoDTO>
    getUserInfo(final Long userId,
                final Long communityId) throws IllegalArgumentException {

        User user = userRepository
                .findById(userId)
                .orElseThrow(NoSuchUserException::new);
        
        if (communityId == null) {
            return new PreResponseDTO<>(UserResponse.UserInfoDTO.of(user), HttpStatus.OK);
        }

        communityRepository
                .findById(communityId)
                .orElseThrow(NoSuchCommunityException::new);
        CommunityUser communityUser = Optional
                .ofNullable(communityUserRepository
                        .findByUserIdAndCommunityId(userId, communityId))
                .orElseThrow(UnauthorizedException::new);

        return new PreResponseDTO<>(UserResponse.UserInfoDTO.from(user, communityUser), HttpStatus.OK);


    }

    @Transactional
    public void
    updateLastActivity(final Long userId) throws NoSuchUserException {

        userRepository
                .findById(userId)
                .orElseThrow(NoSuchUserException::new)
                .updateLastActivity();
    }

    @Transactional(readOnly = true)
    public List<UserResponse.LastActivityDTO>
    getUserInfoInKeyword(final Long keywordId) {

        return userRepository
                .findByKeywordUserKeywordId(keywordId)
                .stream()
                .map(UserResponse.LastActivityDTO::of)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<UserResponse.LastActivityDTO>
    getUserInfoInCommunity(final Long communityId) {

        return userRepository
                .findByCommunityUserCommunityId(communityId)
                .stream()
                .map(UserResponse.LastActivityDTO::of)
                .collect(Collectors.toList());
    }

}
