package com.waglewagle.rest.keyword.repository.custom;

import com.waglewagle.rest.keyword.entity.Keyword;

import java.util.List;
import java.util.Optional;

public interface KeywordCustomRepository {

    List<Keyword> findAssociatedKeywords(final Keyword keyword);

    List<Keyword> findAllFromKeywordUserByUserIdAndCommunityId(final Long userId, final Long communityId);

    int deleteAllByIdInBulk(final List<Long> targetIdList);

    Optional<Keyword> findByKeywordNameAndCommunityId(final String keywordName, final Long communityId);

    List<Keyword> findAllByCommunityIdJoinKeywordUser(final Long communityId);
}
