package com.waglewagle.rest.thread.data_object.dto;

import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.thread.entity.Thread;
import com.waglewagle.rest.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ThreadDTO {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateDTO {

        private User author;
        private Thread parentThread;
        private Keyword keyword;
        private String content;

        public static CreateDTO from(User author, Thread parentThread, Keyword keyword, String content) {
            CreateDTO createDTO = new CreateDTO();
            createDTO.setAuthor(author);
            createDTO.setParentThread(parentThread);
            createDTO.setKeyword(keyword);
            createDTO.setContent(content);
            return createDTO;

        }
    }
}
