package com.waglewagle.rest.community.service;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.community.data_object.dto.response.CommunityResponse;
import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.community.repository.CommunityRepository;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.exception.NoSuchUserException;
import com.waglewagle.rest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public PreResponseDTO<List<CommunityResponse.CommunityDTO>>
    getJoinedCommunities(final Long userId) {
        return new PreResponseDTO<>(communityRepository
                .getJoinedCommunities(userId)
                .stream()
                .map(CommunityResponse.CommunityDTO::of)
                .collect(Collectors.toList()),
                HttpStatus.OK);

    }

    @Transactional
    public PreResponseDTO<CommunityResponse.CommunityDTO>
    createCommunity(final Long userId,
                    final String title,
                    final String description) throws NoSuchUserException {

        User user = userRepository
                .findById(userId)
                .orElseThrow(NoSuchUserException::new);

        Community community = Community.from(title, description, user);
        communityRepository.save(community);

        return new PreResponseDTO<>(
                CommunityResponse.CommunityDTO.of(community),
                HttpStatus.CREATED
        );
    }
}
