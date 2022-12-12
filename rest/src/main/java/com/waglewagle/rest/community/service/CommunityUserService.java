package com.waglewagle.rest.community.service;


import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.community.data_object.dto.request.CommunityUserRequest;
import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.community.entity.CommunityUser;
import com.waglewagle.rest.community.exception.AlreadyJoinedCommunityException;
import com.waglewagle.rest.community.exception.NoSuchCommunityException;
import com.waglewagle.rest.community.exception.UnSubscribedCommunityException;
import com.waglewagle.rest.community.repository.CommunityRepository;
import com.waglewagle.rest.community.repository.CommunityUserRepository;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.exception.NoSuchUserException;
import com.waglewagle.rest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommunityUserService {

    private final CommunityUserRepository communityUserRepository;
    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;


    public boolean
    isJoinedCommunity(final Long userId,
                      final Long communityId) {
        return Optional
                .ofNullable(communityUserRepository
                        .findByUserIdAndCommunityId(userId, communityId))
                .isPresent();
    }

    @Transactional
    public PreResponseDTO
    joinCommunity(final Long userId,
                  final Long communityId)
            throws
            NoSuchUserException,
            NoSuchCommunityException {

        
        if (isJoinedCommunity(userId, communityId))
            throw new AlreadyJoinedCommunityException();

        User user = userRepository
                .findById(userId)
                .orElseThrow(NoSuchUserException::new);
        Community community = communityRepository
                .findById(communityId)
                .orElseThrow(NoSuchCommunityException::new);

        communityUserRepository.save(CommunityUser.from(user, community));
        return new PreResponseDTO<>(null, HttpStatus.CREATED);
    }


    @Transactional
    public void
    updateCommunityUserProfile(final CommunityUserRequest.UpdateProfileDTO updateProfileDTO,
                               final Long communityId,
                               final Long userId) {

        if (!isJoinedCommunity(userId, communityId))
            throw new UnSubscribedCommunityException();

        communityUserRepository
                .findByUserIdAndCommunityId(userId, communityId)
                .updateProfile(updateProfileDTO);
    }

    @Transactional
    public void
    updateIsFirstVisit(final Long userId,
                       final Long communityId) {
        if (!isJoinedCommunity(userId, communityId))
            throw new UnSubscribedCommunityException();

        communityUserRepository
                .findByUserIdAndCommunityId(userId, communityId)
                .updateIsFirstVisit();

    }
}
