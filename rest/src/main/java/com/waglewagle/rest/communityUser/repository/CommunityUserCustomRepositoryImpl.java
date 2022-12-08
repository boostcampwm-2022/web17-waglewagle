package com.waglewagle.rest.communityUser.repository;

import com.querydsl.jpa.JPQLQueryFactory;
import com.waglewagle.rest.communityUser.CommunityUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.waglewagle.rest.communityUser.QCommunityUser.communityUser;

@Repository
@RequiredArgsConstructor
public class CommunityUserCustomRepositoryImpl implements CommunityUserCustomRepository {

    private final JPQLQueryFactory jpqlQueryFactory;

    @Override
    public CommunityUser findByUserIdAndCommunityId(Long userId, Long communityId) {

    return jpqlQueryFactory
            .select(communityUser)
            .from(communityUser)
            .where(communityUser.community.id.eq(communityId))
            .where(communityUser.user.id.eq(userId))
            .fetchOne();
    }
}
