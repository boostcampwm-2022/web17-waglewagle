package com.waglewagle.rest.thread.data_object.dto;

import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.thread.entity.Thread;
import com.waglewagle.rest.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ThreadVO {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateVO {

        private User author;
        private Thread parentThread;
        private Keyword keyword;
        private String content;

        public static CreateVO from(User author, Thread parentThread, Keyword keyword, String content) {
            CreateVO createVO = new CreateVO();
            createVO.setAuthor(author);
            createVO.setParentThread(parentThread);
            createVO.setKeyword(keyword);
            createVO.setContent(content);
            return createVO;

        }
    }
}
