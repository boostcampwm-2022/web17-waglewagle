package com.waglewagle.rest.user.repository;

import com.waglewagle.rest.user.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface UserCustomRepository {

    Long findOrSaveUsername(String username);

    List<User> findByKeywordUserKeywordId(Long keywordId);

    List<User> findByCommunityUserCommunityId(Long communityId);
}