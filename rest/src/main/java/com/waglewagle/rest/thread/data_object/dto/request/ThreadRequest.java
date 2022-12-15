package com.waglewagle.rest.thread.data_object.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ThreadRequest {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateDTO {

        private Long keywordId;
        private Long parentThreadId;
        private String content;

        public static CreateDTO from(final Long keywordId,
                                     final String content) {
            CreateDTO createDTO = new CreateDTO();
            createDTO.keywordId = keywordId;
            createDTO.content = content;
            return createDTO;
        }

        public static CreateDTO from(final Long keywordId,
                                     final Long parentThreadId,
                                     final String content) {
            CreateDTO createDTO = new CreateDTO();
            createDTO.keywordId = keywordId;
            createDTO.parentThreadId = parentThreadId;
            createDTO.content = content;
            return createDTO;
        }

        public boolean isValid() {
            return keywordId != null && content != null;
        }
    }


    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class DeleteDTO {

        private Long threadId;
    }
}
