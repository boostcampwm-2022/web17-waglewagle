package com.waglewagle.rest.community;

import com.querydsl.jpa.JPQLQueryFactory;
import com.waglewagle.rest.communityUser.QCommunityUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;



@Repository
@RequiredArgsConstructor
public class CommunityRepository {

    private final EntityManager em;
    private final JPQLQueryFactory jpqlQueryFactory;

    public Community findOneById(Long communityId) {
        return em.find(Community.class, communityId);
    }

    public List<Community> getJoinedCommunities(Long userId) {
        return jpqlQueryFactory
                .select(QCommunityUser.communityUser.community)
                .from(QCommunityUser.communityUser)
                .where(QCommunityUser.communityUser.user.id.eq(userId))
                .groupBy(QCommunityUser.communityUser.community)
                .fetch();

    }
}
