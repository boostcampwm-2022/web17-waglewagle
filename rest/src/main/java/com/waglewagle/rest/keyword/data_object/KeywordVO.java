package com.waglewagle.rest.keyword.data_object;

import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;


public class KeywordVO {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class JoinVO {

        private User user;
        private Community community;
        private Keyword keyword;

        public static JoinVO from(User user, Community community, Keyword keyword) {
            JoinVO joinVO = new JoinVO();
            joinVO.user = user;
            joinVO.community = community;
            joinVO.keyword = keyword;
            return joinVO;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateVO {

        private String keywordName;
        private Community community;
        private User author;

        public static CreateVO from(User author, Community community, String keywordName) {
            CreateVO createVO = new CreateVO();
            createVO.author = author;
            createVO.community = community;
            createVO.keywordName = keywordName;
            return createVO;
        }
    }
}
