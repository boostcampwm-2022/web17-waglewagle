package com.waglewagle.rest.keywordUser;


import com.waglewagle.rest.community.Community;
import com.waglewagle.rest.keyword.Keyword;
import com.waglewagle.rest.keyword.KeywordDTO.*;
import com.waglewagle.rest.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Repository
public interface KeywordUserRepository extends JpaRepository<KeywordUser, Long> {

    void deleteByKeywordAndCommunityAndUser(Keyword keyword, Community community, User user);
}
