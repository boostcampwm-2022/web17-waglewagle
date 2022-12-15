package com.waglewagle.rest.keyword.data_object.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class KeywordRequest {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class JoinDTO {

        private Long keywordId;
        private Long communityId;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateDTO {

        private String keywordName;
        private Long communityId;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class DeleteDTO {

        private Long communityId;
        private List<Long> keywordIdList;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class MergeDTO {

        private Long communityId;
        private Long destinationKeywordId;
        private List<Long> sourceKeywordIdList;
    }


    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class DisjoinDTO {

        private Long keywordId;
        private Long communityId;
    }
}
