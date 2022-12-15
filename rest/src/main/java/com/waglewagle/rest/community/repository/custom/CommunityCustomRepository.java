package com.waglewagle.rest.community.repository.custom;

import com.waglewagle.rest.community.entity.Community;

import java.util.List;

public interface CommunityCustomRepository {
    List<Community> getJoinedCommunities(Long userId);
}