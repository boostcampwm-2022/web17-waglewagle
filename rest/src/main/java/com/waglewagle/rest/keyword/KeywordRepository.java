package com.waglewagle.rest.keyword;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.waglewagle.rest.community.QCommunity;
import com.waglewagle.rest.keyword.KeywordDTO.*;
import com.waglewagle.rest.keywordUser.QKeywordUser;
import com.waglewagle.rest.user.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

//import static이 뭐더라;;;

@Repository
@RequiredArgsConstructor
public class KeywordRepository {

    private final EntityManager em;
    private final JPAQueryFactory jpaQueryFactory;

    public Keyword findOne(Long keywordId) {
        return em.find(Keyword.class, keywordId);
    }

    public List<Keyword> findAllByCommunityId(Long communityId) {
        return jpaQueryFactory
                .selectFrom(QKeyword.keyword1)
                .distinct()
                .innerJoin(QKeyword.keyword1.community, QCommunity.community)
                .innerJoin(QKeyword.keyword1.keywordUsers, QKeywordUser.keywordUser)
                .fetchJoin()
                .where(QCommunity.community.id.eq(communityId))
                .fetch();
    }

    public List<Keyword> findAssociatedKeywords(Keyword keyword) {

        return jpaQueryFactory
                .select(QKeywordUser.keywordUser.keyword)
                .from(QKeywordUser.keywordUser)
                .where(QKeywordUser.keywordUser.user.in(
                        JPAExpressions
                                .select(new QUser(QKeywordUser.keywordUser.user))
                                .from(QKeywordUser.keywordUser)
                                .where(QKeywordUser.keywordUser.keyword.eq(keyword))
                ))
                .where(QKeywordUser.keywordUser.keyword.community.eq(keyword.getCommunity()))
                .fetch(); //TODO: fetch? fetchJoin?
    }

    public boolean isKeywordDuplicated(CreateKeywordInputDTO createKeywordInputDTO) {
        return em.createQuery("SELECT k FROM Keyword k WHERE k.keyword = :keywordName AND k.community.id = :communityId", Keyword.class)
                .setParameter("keywordName", createKeywordInputDTO.getKeywordName())
                .setParameter("communityId",createKeywordInputDTO.getCommunityId())
                .getResultList()
                .size() == 1;
    }

    public void saveKeyword(Keyword keyword) {
        em.persist(keyword);
//        return keyword;
    }

    public List<Keyword> getJoinedKeywords(Long userId, Long communityId) {
        return jpaQueryFactory
                .select(QKeywordUser.keywordUser.keyword)
                .from(QKeywordUser.keywordUser)
                .where(QKeywordUser.keywordUser.user.id.eq(userId))
                .where(QKeywordUser.keywordUser.community.id.eq(communityId))
                .fetch();
    }

    public List<Keyword> findAllByIdList(List<Long> idList) {
        return em.createQuery("select distinct k from Keyword k join fetch k.keywordUsers where k.id in :idList ", Keyword.class)
                .setParameter("idList", idList)
                .getResultList();
    }

    @Modifying(clearAutomatically = true) //TODO: 이거 안먹혔다. & jpa (1차?) 캐시는 트랜잭션 단위다? (트랜잭션 끼리 캐시를 공유하지 않는다? / 트랜잭션 마다 캐시를 가진다.)
    int deleteAllByIdInBulk(List<Long> targetIdList) {
        return (int)jpaQueryFactory.delete(QKeyword.keyword1).where(QKeyword.keyword1.id.in(targetIdList)).execute();
//        return em.createQuery("DELETE FROM Keyword WHERE Keyword.id IN :targetIdList", Keyword.class)
//                .setParameter("targetIdList", targetIdList)
//                .executeUpdate();
    }
}