package com.waglewagle.rest.community;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

public class CommunityDTO {

    @Getter
    @Setter
    public static class CreateCommunityInputDTO {

        private String title;
        private String description;

        public boolean isValid() {
            return title != null && description != null;
        }
    }

    @Getter
    @Setter
    public static class CommunityResponseDTO {

        private String communityId;
        private String title;
        private String description;

        public static List<CommunityResponseDTO> createCommunityResponseDTOs(List<Community> communities) {
            return communities.stream().map(community -> new CommunityResponseDTO(community)).collect(Collectors.toList());
        }

        public CommunityResponseDTO(Community community) {

            communityId = community.getId().toString();
            title = community.getTitle();
            description = community.getSummary();
        }

    }
}
