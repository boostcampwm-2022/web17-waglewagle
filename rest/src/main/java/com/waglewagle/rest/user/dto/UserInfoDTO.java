package com.waglewagle.rest.user.dto;

import com.waglewagle.rest.communityUser.CommunityUser;
import com.waglewagle.rest.user.Role;
import com.waglewagle.rest.user.User;
import lombok.Getter;

public class UserInfoDTO {

    @Getter
    public static class UserInfoResDTO {
        private String userId;
        private String username;
        private String profileImageUrl;
        private Role role;
        private Boolean isFirstInCommunity;

        public UserInfoResDTO (User user, CommunityUser communityUser) {
            userId = String.valueOf(user.getId());
            username = user.getUsername();
            profileImageUrl = user.getProfileImageUrl();
            role = user.getRole();
            isFirstInCommunity = communityUser.getIsFirstVisit();
        }

        public UserInfoResDTO (User user) {
            userId = String.valueOf(user.getId());
            username = user.getUsername();
            profileImageUrl = user.getProfileImageUrl();
            role = user.getRole();
        }
    }
}
