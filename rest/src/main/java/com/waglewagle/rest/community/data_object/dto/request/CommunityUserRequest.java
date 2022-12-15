package com.waglewagle.rest.community.data_object.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class CommunityUserRequest {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class JoinDTO {

        private String communityId;
    }


    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class UpdateProfileDTO {

        private String profileImageUrl;
        private String username;


        public boolean isEmpty() {
            return profileImageUrl == null && username == null;
        }
    }
}
