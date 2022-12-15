package com.waglewagle.rest.community.service;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.community.data_object.dto.response.CommunityResponse;
import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.community.entity.CommunityUser;
import com.waglewagle.rest.community.repository.CommunityRepository;
import com.waglewagle.rest.community.repository.CommunityUserRepository;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.exception.NoSuchUserException;
import com.waglewagle.rest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;
    private final CommunityUserRepository communityUserRepository;

    @Transactional
    public PreResponseDTO<List<CommunityResponse.CommunityDTO>>
    getJoinedCommunities(final Long userId) {
        List<CommunityResponse.CommunityDTO>
                communityDTOS = communityRepository
                .getJoinedCommunities(userId)
                .stream()
                .map(CommunityResponse.CommunityDTO::of)
                .collect(Collectors.toList());

        List<Long> communityIds = communityDTOS
                .stream()
                .map(CommunityResponse.CommunityDTO::getCommunityId)
                .map(Long::parseLong)
                .collect(Collectors.toList());

        List<CommunityUser> communityUsers = communityUserRepository
                .findAllByCommunityIds(communityIds);

        HashMap<Long, CommunityResponse.CommunityDTO> idToDTO = new HashMap<>();

        communityDTOS.forEach(communityDTO -> {
            idToDTO.put(Long.parseLong(communityDTO.getCommunityId()), communityDTO);
        });
        communityUsers.forEach(communityUser -> {
            idToDTO.get(communityUser.getCommunity().getId()).addMemberCount();
        });

        return new PreResponseDTO<>(
                communityDTOS,
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
