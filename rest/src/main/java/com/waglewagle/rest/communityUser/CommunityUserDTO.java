package com.waglewagle.rest.communityUser;

import lombok.Getter;
import lombok.Setter;

public class CommunityUserDTO {

    @Getter
    @Setter
    public static class JoinCommunityInputDTO {

        private String communityId;
    }

    @Getter
    @Setter
    public static class UpdateCommunityProfileInputDTO {

        private String profileImageUrl;
        private String username;


        public boolean isEmpty() {
            return profileImageUrl == null && username == null;
        }
    }
}
