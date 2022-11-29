package com.waglewagle.rest.community;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class CommunityRepository {

    private final EntityManager em;

    public Community findOneById(Long communityId) {
        return em.find(Community.class, communityId);
    }
}
