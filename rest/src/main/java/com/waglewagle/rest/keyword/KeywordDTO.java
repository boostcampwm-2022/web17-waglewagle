package com.waglewagle.rest.keyword;

import com.waglewagle.rest.community.Community;
import com.waglewagle.rest.user.User;
import lombok.*;

@Getter
@ToString
@AllArgsConstructor
public class KeywordDTO {
    String keywordId;
    String keywordName;
    Integer memberCount;

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
    public static class CreateKeywordResponse {

        private final String keywordId;
        private final String keywordName;

        CreateKeywordResponse(Keyword keyword) {
            keywordId = String.valueOf(keyword.getId());
            keywordName = keyword.getKeyword();
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
}
