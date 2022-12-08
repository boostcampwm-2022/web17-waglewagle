package com.waglewagle.rest.community;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.community.repository.CommunityRepository;
import com.waglewagle.rest.user.User;
import com.waglewagle.rest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


import static com.waglewagle.rest.community.CommunityDTO.*;
@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;

    @Transactional
    public boolean isExistCommunity(Long communityId) {

        return communityRepository.findById(communityId).isPresent();
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

        Optional<User> optUser = userRepository.findById(userId);
        if (optUser.isEmpty()) {
            return new PreResponseDTO<>(null, HttpStatus.FORBIDDEN);
        }
        User user = optUser.get();

        Community community = new Community(title, description, user);

        communityRepository.save(community);
        return new PreResponseDTO<>(
                new CommunityResponseDTO(community),
                HttpStatus.CREATED
        );
    }
}
