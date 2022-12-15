package com.waglewagle.rest.community.data_object.dto.response;

import com.waglewagle.rest.community.entity.Community;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class CommunityResponse {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CommunityDTO {

        private String communityId;
        private String title;
        private String description;

        public static CommunityDTO of(final Community community) {
            CommunityDTO communityDTO = new CommunityDTO();
            communityDTO.communityId = community.getId().toString();
            communityDTO.title = community.getTitle();
            communityDTO.description = community.getSummary();
            return communityDTO;
        }
    }
}
