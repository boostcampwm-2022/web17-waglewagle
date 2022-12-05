package com.waglewagle.rest.keyword;

import com.waglewagle.rest.community.Community;
import com.waglewagle.rest.user.User;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@ToString
@AllArgsConstructor
public class KeywordDTO {
    String keywordId;
    String keywordName;
    Integer memberCount;


    @Getter
    public static class JoinKeywordInputDTO {

        private Long keywordId;
        private Long communityId;

        public void setKeywordId(String keywordId) {
            this.keywordId = Long.parseLong(keywordId);
        }

        public void setCommunityId(String communityId) {
            this.communityId = Long.parseLong(communityId);
        }

        public boolean isValid() {
            return keywordId != null && communityId != null;
        }
    }

    @Getter
    public static class JoinKeywordDTO {

        private User user;
        private Community community;
        private Keyword keyword;

        public static JoinKeywordDTO createJoinKeywordDTO(User user, Community community, Keyword keyword) {
            return new JoinKeywordDTO(user, community, keyword);
        }

        protected JoinKeywordDTO(User user, Community community, Keyword keyword) {
            this.user = user;
            this.community = community;
            this.keyword = keyword;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class DisjoinKeywordDTO {

        private Long keywordId;
        private Long communityId;
    }

    @Getter
    public static class CreateKeywordInputDTO {

        private String keywordName;
        private Long communityId;

        public void setCommunityId(String communityId) {
            this.communityId = Long.parseLong(communityId);
        }

        public void setKeywordName(String keywordName) {
            this.keywordName = keywordName;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class CreateKeywordDTO {

        private String keywordName;
        private Community community;
        private User author;

        public static CreateKeywordDTO createCreateKeywordDTO (User author, Community community, String keywordName) {
            return new CreateKeywordDTO(author, community, keywordName);
        }

        protected CreateKeywordDTO(User author, Community community, String keywordName) {
            this.author = author;
            this.community = community;
            this.keywordName = keywordName;
        }
    }

    @Getter
    public static class KeywordResponseDTO {

        private final String keywordId;
        private final String keywordName;

        public KeywordResponseDTO(Keyword keyword) {
            keywordId = String.valueOf(keyword.getId());
            keywordName = keyword.getKeyword();
        }

        static List<KeywordResponseDTO> createKeywordResponses(List<Keyword> keywords) {
            return keywords.stream().map(keyword -> new KeywordResponseDTO(keyword)).collect(Collectors.toList());
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class KeywordMergeReq {

        private Long communityId;
        private Long destinationKeywordId;
        private List<Long> sourceKeywordIdList;
    }

    @Getter
    public static class DeleteReq {

        private Long communityId;
        private List<Long> keywordIdList;
    }
}
