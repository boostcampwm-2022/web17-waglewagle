package com.waglewagle.rest.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final EntityManager em;

    public User findById (Long userId) {
        User user = em.find(User.class, userId);
        return user;
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
}
