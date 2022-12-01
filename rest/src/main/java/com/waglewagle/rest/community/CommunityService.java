package com.waglewagle.rest.community;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;

    public boolean isExistCommunity(Long communityId) {
        Community community = communityRepository.findOneById(communityId);

        return community != null;
    }

    @Transactional
    public List<Community> getJoinedCommunities(Long userId) {
        List<Community> communities = communityRepository.getJoinedCommunities(userId);

        return communities;
    }
}
