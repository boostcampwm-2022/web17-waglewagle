package com.waglewagle.rest.keyword.data_object.dto.response;

import com.waglewagle.rest.keyword.entity.Keyword;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class KeywordResponse {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class KeywordDTO {

        private String keywordId;
        private String keywordName;

        public static KeywordDTO of(Keyword keyword) {
            KeywordDTO keywordDTO = new KeywordDTO();
            keywordDTO.keywordId = keyword.getId().toString();
            keywordDTO.keywordName = keyword.getKeyword();
            return keywordDTO;

        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class KeywordMemberCountDTO {
        String keywordId;
        String keywordName;
        Integer memberCount;

        public static KeywordMemberCountDTO of(Keyword keyword) {
            KeywordMemberCountDTO keywordMemberCountDTO = new KeywordMemberCountDTO();
            keywordMemberCountDTO.keywordId = keyword.getId().toString();
            keywordMemberCountDTO.keywordName = keyword.getKeyword();
            keywordMemberCountDTO.memberCount = keyword.getKeywordUsers().size();
            return keywordMemberCountDTO;
        }
    }
}
