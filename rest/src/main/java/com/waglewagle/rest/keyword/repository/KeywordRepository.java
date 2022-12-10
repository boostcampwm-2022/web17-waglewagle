package com.waglewagle.rest.keyword.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.waglewagle.rest.community.entity.QCommunity;
import com.waglewagle.rest.keyword.data_object.dto.request.KeywordRequest;
import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.keyword.entity.QKeyword;
import com.waglewagle.rest.keyword.entity.QKeywordUser;
import com.waglewagle.rest.user.entity.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class KeywordRepository {

    private final EntityManager em;
    private final JPAQueryFactory jpaQueryFactory;

    public Keyword
    findOne(final Long keywordId) {
        return em.find(Keyword.class, keywordId);
    }


    public Optional<Keyword>
    findById(final Long keywordId) {
        return Optional
                .ofNullable(
                        em
                                .find(Keyword.class, keywordId)
                );
    }

    public List<Keyword>
    findAllByCommunityId(final Long communityId) {
        return jpaQueryFactory
                .selectFrom(QKeyword.keyword1)
                .distinct()
                .leftJoin(QKeyword.keyword1.community, QCommunity.community)
                .leftJoin(QKeyword.keyword1.keywordUsers, QKeywordUser.keywordUser)
                .fetchJoin()
                .where(QCommunity.community.id.eq(communityId))
                .fetch();
    }

    public List<Keyword>
    findAssociatedKeywords(final Keyword keyword) {

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

    public boolean
    isKeywordDuplicated(final KeywordRequest.CreateDTO createDTO) {
        return em.createQuery("SELECT k FROM Keyword k WHERE k.keyword = :keywordName AND k.community.id = :communityId", Keyword.class)
                .setParameter("keywordName", createDTO.getKeywordName())
                .setParameter("communityId", createDTO.getCommunityId())
                .getResultList()
                .size() == 1;
    }

    public void
    saveKeyword(final Keyword keyword) {
        em.persist(keyword);
//        return keyword;
    }

    public List<Keyword>
    getJoinedKeywords(final Long userId,
                      final Long communityId) {
        return jpaQueryFactory
                .select(QKeywordUser.keywordUser.keyword)
                .from(QKeywordUser.keywordUser)
                .where(QKeywordUser.keywordUser.user.id.eq(userId))
                .where(QKeywordUser.keywordUser.community.id.eq(communityId))
                .fetch();
    }

    public List<Keyword>
    findAllByIdList(final List<Long> idList) {
        return em.createQuery("select distinct k from Keyword k join fetch k.keywordUsers where k.id in :idList ", Keyword.class)
                .setParameter("idList", idList)
                .getResultList();
    }

    @Modifying(clearAutomatically = true)
    //TODO: 이거 안먹혔다. & jpa (1차?) 캐시는 트랜잭션 단위다? (트랜잭션 끼리 캐시를 공유하지 않는다? / 트랜잭션 마다 캐시를 가진다.)
    public int
    deleteAllByIdInBulk(final List<Long> targetIdList) {
        return (int) jpaQueryFactory.delete(QKeyword.keyword1).where(QKeyword.keyword1.id.in(targetIdList)).execute();
//        return em.createQuery("DELETE FROM Keyword WHERE Keyword.id IN :targetIdList", Keyword.class)
//                .setParameter("targetIdList", targetIdList)
//                .executeUpdate();
    }
}