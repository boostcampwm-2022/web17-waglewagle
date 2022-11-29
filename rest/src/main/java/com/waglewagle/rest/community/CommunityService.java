package com.waglewagle.rest.community;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;

    public boolean isExistCommunity(Long communityId) {
        Community community = communityRepository.findOneById(communityId);

        return community != null;
    }
}
