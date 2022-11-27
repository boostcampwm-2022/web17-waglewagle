package com.waglewagle.rest.keyword;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.waglewagle.rest.user.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.waglewagle.rest.community.QCommunity.community;
import static com.waglewagle.rest.keyword.QKeyword.keyword1;
import static com.waglewagle.rest.keywordUser.QKeywordUser.keywordUser;

@Repository
@RequiredArgsConstructor
public class review_KeywordRepository {

    private final EntityManager em;
    private final JPAQueryFactory jpaQueryFactory;

    public Keyword findOne(Long keywordId) {
        return em.find(Keyword.class, keywordId);
    }

    public List<Keyword> findAssociatedKeywords(Keyword keyword) {

        return jpaQueryFactory
                .select(keywordUser.keyword)
                .from(keywordUser)
                .where(keywordUser.user.in(
                        JPAExpressions
                                .select(new QUser(keywordUser.user))
                                .from(keywordUser)
                                .where(keywordUser.keyword.eq(keyword))
                ))
                .fetch();
    }
}