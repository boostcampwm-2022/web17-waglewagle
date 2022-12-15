package com.waglewagle.rest.community.data_object.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class CommunityRequest {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateDTO {

        private String title;
        private String description;

        public boolean isValid() {
            return title != null && description != null;
        }
    }


}
