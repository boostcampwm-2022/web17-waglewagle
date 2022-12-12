package com.waglewagle.rest.user.repository.custom;

import com.querydsl.jpa.JPQLQueryFactory;
import com.waglewagle.rest.user.entity.QUser;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.enums.OauthMethod;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.waglewagle.rest.community.entity.QCommunityUser.communityUser;
import static com.waglewagle.rest.keyword.entity.QKeywordUser.keywordUser;


@RequiredArgsConstructor
@Repository
public class UserCustomRepositoryImpl implements UserCustomRepository {

    private final EntityManager entityManager;
    private final JPQLQueryFactory jpqlQueryFactory;


    @Transactional
    public Long
    findOrSaveUsername(final String username) {

        User user = jpqlQueryFactory
                .select(QUser.user)
                .from(QUser.user)
                .where(QUser.user.username.eq(username))
                .fetchOne();

        if (user == null) {
            user = new User();
            user.setUsername(username);
            user.setOauthKey(username);
            user.setOauthMethod(OauthMethod.USERNAME);

            entityManager.persist(user);
        }

        return user.getId();
    }

    public List<User>
    findByKeywordUserKeywordId(final Long keywordId) {

        return jpqlQueryFactory
                .select(keywordUser.user)
                .from(keywordUser)
                .where(keywordUser.keyword.id.eq(keywordId))
                .orderBy(keywordUser.user.username.asc())
                .fetch();
    }

    public List<User>
    findByCommunityUserCommunityId(final Long communityId) {
        
        return jpqlQueryFactory
                .select(communityUser.user)
                .from(communityUser)
                .where(communityUser.community.id.eq(communityId))
                .orderBy(communityUser.user.username.asc())
                .fetch();
    }
}
