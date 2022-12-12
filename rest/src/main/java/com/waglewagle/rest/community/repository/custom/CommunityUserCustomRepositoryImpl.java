package com.waglewagle.rest.community.repository.custom;

import com.querydsl.jpa.JPQLQueryFactory;
import com.waglewagle.rest.community.entity.CommunityUser;
import com.waglewagle.rest.community.entity.QCommunityUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
@RequiredArgsConstructor
public class CommunityUserCustomRepositoryImpl implements CommunityUserCustomRepository {

    private final JPQLQueryFactory jpqlQueryFactory;

    @Override
    public CommunityUser
    findByUserIdAndCommunityId(final Long userId,
                               final Long communityId) {

        return jpqlQueryFactory
                .select(QCommunityUser.communityUser)
                .from(QCommunityUser.communityUser)
                .where(QCommunityUser.communityUser.community.id.eq(communityId))
                .where(QCommunityUser.communityUser.user.id.eq(userId))
                .fetchOne();
    }

    @Override
    public Optional<CommunityUser>
    findOptionalByUserIdAndCommunityId(final Long userId,
                                       final Long communityId) {
        return Optional.ofNullable(
                jpqlQueryFactory
                        .select(QCommunityUser.communityUser)
                        .from(QCommunityUser.communityUser)
                        .where(QCommunityUser.communityUser.user.id.eq(userId))
                        .where(QCommunityUser.communityUser.community.id.eq(communityId))
                        .fetchOne()
        );
    }
}
