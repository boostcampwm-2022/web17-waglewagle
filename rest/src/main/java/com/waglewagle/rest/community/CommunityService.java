package com.waglewagle.rest.community;

import com.waglewagle.rest.community.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;

    public boolean isExistCommunity(Long communityId) {

        return communityRepository.findById(communityId).isPresent();
    }

    @Transactional
    public List<Community> getJoinedCommunities(Long userId) {
        List<Community> communities = communityRepository.getJoinedCommunities(userId);

        return communities;
    }
}
