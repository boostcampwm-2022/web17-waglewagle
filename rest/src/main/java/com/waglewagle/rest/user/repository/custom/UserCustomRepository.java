package com.waglewagle.rest.user.repository.custom;

import com.waglewagle.rest.user.entity.User;

import java.util.List;

public interface UserCustomRepository {

    Long findOrSaveUsername(String username);

    List<User> findByKeywordUserKeywordId(Long keywordId);

    List<User> findByCommunityUserCommunityId(Long communityId);
}