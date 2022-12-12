package com.waglewagle.rest.community.repository.custom;

import com.waglewagle.rest.community.entity.CommunityUser;

import java.util.Optional;

public interface CommunityUserCustomRepository {

    CommunityUser findByUserIdAndCommunityId(Long userId, Long communityId);

    Optional<CommunityUser> findOptionalByUserIdAndCommunityId(Long userId, Long communityId);
}
