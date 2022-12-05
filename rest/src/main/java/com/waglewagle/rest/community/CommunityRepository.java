package com.waglewagle.rest.community;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;


import static com.waglewagle.rest.communityUser.QCommunityUser.communityUser;

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
                .select(communityUser.community)
                .from(communityUser)
                .where(communityUser.user.id.eq(userId))
                .groupBy(communityUser.community)
                .fetch();

    }
}
