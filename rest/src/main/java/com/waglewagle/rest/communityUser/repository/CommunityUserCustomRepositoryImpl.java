package com.waglewagle.rest.communityUser.repository;

import com.querydsl.jpa.JPQLQueryFactory;
import com.waglewagle.rest.communityUser.CommunityUser;
import com.waglewagle.rest.communityUser.QCommunityUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


@Repository
@RequiredArgsConstructor
public class CommunityUserCustomRepositoryImpl implements CommunityUserCustomRepository {

    private final JPQLQueryFactory jpqlQueryFactory;

    @Override
    public CommunityUser findByUserIdAndCommunityId(Long userId, Long communityId) {

    return jpqlQueryFactory
            .select(QCommunityUser.communityUser)
            .from(QCommunityUser.communityUser)
            .where(QCommunityUser.communityUser.community.id.eq(communityId))
            .where(QCommunityUser.communityUser.user.id.eq(userId))
            .fetchOne();
    }
}
