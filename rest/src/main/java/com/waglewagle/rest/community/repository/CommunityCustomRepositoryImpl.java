package com.waglewagle.rest.community.repository;

import com.querydsl.jpa.JPQLQueryFactory;
import com.waglewagle.rest.community.Community;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

import java.util.List;

import static com.waglewagle.rest.communityUser.QCommunityUser.communityUser;

@Repository
@RequiredArgsConstructor
public class CommunityCustomRepositoryImpl implements CommunityCustomRepository{

    private final EntityManager em;
    private final JPQLQueryFactory jpqlQueryFactory;

    public Community findById(Long communityId) {
        return em.find(Community.class, communityId);
    }

    public List<Community> getJoinedCommunities(Long userId) {
        return jpqlQueryFactory
                .select(communityUser.community)
                .from(communityUser)
                .where(communityUser.user.id.eq(userId))
                .groupBy(communityUser.community)
                .fetch();

    }
}
