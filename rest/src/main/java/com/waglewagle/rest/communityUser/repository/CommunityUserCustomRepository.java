package com.waglewagle.rest.communityUser.repository;

import com.waglewagle.rest.communityUser.CommunityUser;

public interface CommunityUserCustomRepository {

    public CommunityUser findByUserIdAndCommunityId(Long userId, Long communityId);
}
