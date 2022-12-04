package com.waglewagle.rest.user;

import com.querydsl.jpa.JPQLQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final EntityManager em;
    private final JPQLQueryFactory jpqlQueryFactory;

    @Transactional
    public User save(User user) {

        //TODO: TEMP!!!
        List<User> emailList = em.createQuery("select u from User u Where u.email = :email", User.class)
                .setParameter("email", user.getEmail()).getResultList();

        if (emailList.isEmpty()) {
            em.persist(user);
            return user;
        } else {
            return em.merge(user); //TODO: merge 쓰지말랬는데, 왜? 대안은?
        }
    }

    @Transactional(readOnly = true)
    public User findById (Long userId) {
        User user = em.find(User.class, userId);
        return user;
    }

    //TODO: Optional 문법 이거 맞아? (new 객체일까?)
    public Optional<User> findByEmail(String email) {
        List<User> userList = em.createQuery("select u from User u Where u.email = :email", User.class)
                .setParameter("email", email).getResultList();

        if (userList.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(userList.get(0));
        }
    }

    public Long findOrSaveUsername(String username) {
        try {
        String SQLQuery = "SELECT u FROM User u WHERE u.username = ?1";
        TypedQuery<User> query = em.createQuery(SQLQuery, User.class);
        User user = query.setParameter(1, username).getSingleResult();

        return user.getId();

        } catch (NoResultException noResultException) {
        User user = new User();
        user.setUsername(username);
        user.setOauthKey(username);
        user.setOauthMethod(OauthMethod.USERNAME);
        em.persist(user);

        return user.getId();
        }
    }

    public List<User> findByUsername(String username) {
        return em.createQuery("SELECT u FROM User u WHERE u.username = :username").setParameter("username", username).getResultList();
    }

}
