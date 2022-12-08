package com.waglewagle.rest.thread.data_object.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ThreadRequest {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateThreadInputDTO {

        private Long keywordId;
        private Long parentThreadId;
        private String content;

        public static CreateThreadInputDTO from(final Long keywordId,
                                                final String content) {
            CreateThreadInputDTO createThreadInputDTO = new CreateThreadInputDTO();
            createThreadInputDTO.keywordId = keywordId;
            createThreadInputDTO.content = content;
            return createThreadInputDTO;
        }

        public static CreateThreadInputDTO from(final Long keywordId,
                                                final Long parentThreadId,
                                                final String content) {
            CreateThreadInputDTO createThreadInputDTO = new CreateThreadInputDTO();
            createThreadInputDTO.keywordId = keywordId;
            createThreadInputDTO.parentThreadId = parentThreadId;
            createThreadInputDTO.content = content;
            return createThreadInputDTO;
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
