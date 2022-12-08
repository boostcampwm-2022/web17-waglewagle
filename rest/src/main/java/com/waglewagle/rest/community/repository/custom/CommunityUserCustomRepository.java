package com.waglewagle.rest.community.repository.custom;

import com.waglewagle.rest.community.entity.CommunityUser;

public interface CommunityUserCustomRepository {

    public CommunityUser findByUserIdAndCommunityId(Long userId, Long communityId);
}
