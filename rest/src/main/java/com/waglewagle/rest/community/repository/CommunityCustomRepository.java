package com.waglewagle.rest.community.repository;

import com.waglewagle.rest.community.Community;

import java.util.List;

public interface CommunityCustomRepository {
    List<Community> getJoinedCommunities(Long userId);
}