package com.waglewagle.rest.communityUser;

import lombok.Getter;
import lombok.Setter;

public class CommunityUserDTO {

    @Getter
    @Setter
    public static class JoinCommunityInputDTO {

        private String communityId;
    }
}
