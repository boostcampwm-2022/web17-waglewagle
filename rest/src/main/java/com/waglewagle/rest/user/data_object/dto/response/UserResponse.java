package com.waglewagle.rest.user.data_object.dto.response;

import com.waglewagle.rest.community.entity.CommunityUser;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.enums.Role;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class UserResponse {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class AuthorDTO {
        private String userId;
        private String username;
        private String profileImageUrl;

        public static AuthorDTO of(User user) {
            AuthorDTO authorDTO = new AuthorDTO();
            authorDTO.userId = user.getId().toString();
            authorDTO.username = user.getUsername();
            authorDTO.profileImageUrl = user.getProfileImageUrl();
            return authorDTO;
        }

        public static AuthorDTO from(CommunityUser communityUser, User user) {
            AuthorDTO authorDTO = new AuthorDTO();
            authorDTO.userId = communityUser.getUser().getId().toString();
            authorDTO.username = communityUser.getCommunityUsername();
            authorDTO.profileImageUrl = communityUser.getProfileImageUrl();

            if (authorDTO.profileImageUrl == null)
                authorDTO.profileImageUrl = user.getProfileImageUrl();
            if (authorDTO.username == null)
                authorDTO.username = user.getUsername();

            return authorDTO;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class LoginDTO {

        private boolean success;
        private Long userId;

        public static LoginDTO from(boolean success, Long userId) {
            LoginDTO loginDTO = new LoginDTO();
            loginDTO.success = success;
            loginDTO.userId = userId;
            return loginDTO;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class UpdateProfileDTO {

        private String username;
        private String profileImageUrl;
        private String userId;

        public static UpdateProfileDTO of(User user) {
            UpdateProfileDTO updateProfileDTO = new UpdateProfileDTO();
            updateProfileDTO.profileImageUrl = user.getProfileImageUrl();
            updateProfileDTO.userId = user.getId().toString();
            updateProfileDTO.username = user.getUsername();
            return updateProfileDTO;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class LastActivityDTO {

        private String userId;
        private String username;
        private String profileImageUrl;
        private LocalDateTime lastActivity;

        public static LastActivityDTO of(User user) {
            LastActivityDTO lastActivityDTO = new LastActivityDTO();
            lastActivityDTO.userId = user.getId().toString();
            lastActivityDTO.username = user.getUsername();
            lastActivityDTO.profileImageUrl = user.getProfileImageUrl();
            lastActivityDTO.lastActivity = user.getLastActivity();
            return lastActivityDTO;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class UserInfoDTO {
        private String userId;
        private String username;
        private String profileImageUrl;
        private Role role;
        private Boolean isFirstInCommunity;

        public static UserInfoDTO of(User user) {
            UserInfoDTO userInfoDTO = new UserInfoDTO();
            userInfoDTO.userId = String.valueOf(user.getId());
            userInfoDTO.username = user.getUsername();
            userInfoDTO.profileImageUrl = user.getProfileImageUrl();
            userInfoDTO.role = user.getRole();
            return userInfoDTO;
        }

        public static UserInfoDTO from(User user, CommunityUser communityUser) {
            UserInfoDTO userInfoDTO = new UserInfoDTO();
            userInfoDTO.userId = String.valueOf(user.getId());
            userInfoDTO.username = user.getUsername();
            userInfoDTO.profileImageUrl = user.getProfileImageUrl();
            userInfoDTO.role = user.getRole();
            userInfoDTO.isFirstInCommunity = communityUser.getIsFirstVisit();
            return userInfoDTO;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class ProfileDTO {
        private String communityId;
        private String communityUsername;
        private String profileImageUrl;

        public static ProfileDTO of(CommunityUser communityUser) {
            ProfileDTO profileDTO = new ProfileDTO();
            profileDTO.communityId = communityUser.getCommunity().getId().toString();
            profileDTO.communityUsername = communityUser.getCommunityUsername();
            profileDTO.profileImageUrl = communityUser.getProfileImageUrl();

            return profileDTO;
        }
    }
}
