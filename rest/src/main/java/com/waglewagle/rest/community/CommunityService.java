package com.waglewagle.rest.community;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.user.User;
import com.waglewagle.rest.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;


import static com.waglewagle.rest.community.CommunityDTO.*;
@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;

    @Transactional
    public boolean isExistCommunity(Long communityId) {
        Community community = communityRepository.findOneById(communityId);

        return community != null;
    }

    @Transactional
    public List<Community> getJoinedCommunities(Long userId) {
        List<Community> communities = communityRepository.getJoinedCommunities(userId);

        return communities;
    }

    @Transactional
    public PreResponseDTO<CommunityResponseDTO> createCommunity(Long userId,
                                                                String title,
                                                                String description) {

        User user = userRepository.findById(userId);
        Community community = new Community(title, description, user);

        communityRepository.save(community);
        return new PreResponseDTO<>(
                new CommunityResponseDTO(community),
                HttpStatus.CREATED
        );
    }
}
