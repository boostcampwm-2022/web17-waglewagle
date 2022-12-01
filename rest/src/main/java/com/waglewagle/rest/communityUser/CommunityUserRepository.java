package com.waglewagle.rest.communityUser;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CommunityUserRepository {

    private final EntityManager em;

    public void save(CommunityUser communityUser) {
        em.persist(communityUser);
    }

    public CommunityUser findByUserIdCommunityId(Long userId, Long communityId) {
        List<CommunityUser> communityUsers = em.createQuery("SELECT cu FROM CommunityUser cu WHERE cu.user.id = :userId AND cu.community.id = :communityId")
                .setParameter("userId", userId)
                .setParameter("communityId", communityId)
                .getResultList();

        if (communityUsers.isEmpty()) {
            return null;
        }

        return communityUsers.get(0);
    }
}
