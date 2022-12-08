package com.waglewagle.rest.user.repository;

import com.querydsl.jpa.JPQLQueryFactory;
import com.waglewagle.rest.communityUser.QCommunityUser;
import com.waglewagle.rest.user.OauthMethod;
import com.waglewagle.rest.user.QUser;
import com.waglewagle.rest.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.waglewagle.rest.communityUser.QCommunityUser.communityUser;
import static com.waglewagle.rest.keywordUser.QKeywordUser.keywordUser;
import static com.waglewagle.rest.user.QUser.user;

@RequiredArgsConstructor
@Repository
public class UserCustomRepositoryImpl implements UserCustomRepository{

    private final EntityManager em;
    private final JPQLQueryFactory jpqlQueryFactory;

//    @Transactional
//    public User save(User user) {
//
//        //TODO: TEMP!!!
//        List<User> emailList = em.createQuery("select u from User u Where u.email = :email", User.class)
//                .setParameter("email", user.getEmail()).getResultList();
//
//        if (emailList.isEmpty()) {
//            em.persist(user);
//            return user;
//        } else {
//            return em.merge(user); //TODO: merge 쓰지말랬는데, 왜? 대안은?
//        }
//    }

//    @Transactional(readOnly = true)
//    public User findById (Long userId) {
//        User user = em.find(User.class, userId);
//        return user;
//    }
    @Transactional
    public Long findOrSaveUsername(String username) {
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
            em.persist(user);
        }

        return user.getId();
    }

//    public User findByUsername(String username) {
//        return jpqlQueryFactory
//                .select(user)
//                .from(user)
//                .where(user.username.eq(username))
//                .fetchOne();
//    }

    public List<User> findByKeywordUserKeywordId(Long keywordId) {
        return jpqlQueryFactory
                .select(keywordUser.user)
                .from(keywordUser)
                .where(keywordUser.keyword.id.eq(keywordId))
                .orderBy(keywordUser.user.username.asc())
                .fetch();
    }

    public List<User> findByCommunityUserCommunityId(Long communityId) {
        return jpqlQueryFactory
                .select(communityUser.user)
                .from(communityUser)
                .where(communityUser.community.id.eq(communityId))
                .orderBy(communityUser.user.username.asc())
                .fetch();
    }
}
