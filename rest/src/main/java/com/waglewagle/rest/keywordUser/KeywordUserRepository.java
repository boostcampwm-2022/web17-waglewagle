package com.waglewagle.rest.keywordUser;


import com.waglewagle.rest.community.Community;
import com.waglewagle.rest.keyword.Keyword;
import com.waglewagle.rest.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeywordUserRepository extends JpaRepository<KeywordUser, Long> {

    void deleteByKeywordAndCommunityAndUser(Keyword keyword, Community community, User user);

    //참고사이트: https://devhyogeon.tistory.com/4
    @Modifying(clearAutomatically = true)
    //TODO: QueryDSL로 바꿔
    @Query("UPDATE KeywordUser ku SET ku.keyword.id = ?2 WHERE ku.keyword.id IN ?1")
    int updateAllKeywordIdByIdInBulk(List<Long> srcIdList, Long desId);

    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM KeywordUser ku WHERE ku.keyword.id IN ?1")
    int deleteAllByKeywordIdInBulk(List<Long> keywordIdList);
}
