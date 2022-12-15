package com.waglewagle.rest.user.data_object.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class UserRequest {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class UpdateProfileDTO {

        private String profileImageUrl;
        private String username;

        public boolean isEmpty() {
            return this.getUsername() == null && this.getProfileImageUrl() == null;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class UsernameLoginDTO {
        private String username;
    }
}
