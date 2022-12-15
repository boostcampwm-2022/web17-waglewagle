package com.waglewagle.rest.community.repository.custom;

import com.querydsl.jpa.JPQLQueryFactory;
import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.community.entity.QCommunityUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@RequiredArgsConstructor
public class CommunityCustomRepositoryImpl implements CommunityCustomRepository {
    private final JPQLQueryFactory jpqlQueryFactory;

    public List<Community>
    getJoinedCommunities(final Long userId) {
        return jpqlQueryFactory
                .select(QCommunityUser.communityUser.community)
                .from(QCommunityUser.communityUser)
                .where(QCommunityUser.communityUser.user.id.eq(userId))
                .groupBy(QCommunityUser.communityUser.community)
                .fetch();

    }
}
