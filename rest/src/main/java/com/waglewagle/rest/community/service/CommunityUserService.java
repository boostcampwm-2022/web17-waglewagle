package com.waglewagle.rest.community.service;

import com.waglewagle.rest.community.data_object.dto.CommunityUserDTO.UpdateCommunityProfileInputDTO;
import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.community.entity.CommunityUser;
import com.waglewagle.rest.community.repository.CommunityRepository;
import com.waglewagle.rest.community.repository.CommunityUserRepository;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommunityUserService {

    private final CommunityUserRepository communityUserRepository;
    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;


    @Transactional
    public boolean isJoined(Long userId, Long communityId) {
        return communityUserRepository.findByUserIdAndCommunityId(userId, communityId) != null;
    }


    @Transactional
    public void joinCommunity(Long userId, Long communityId) throws IllegalArgumentException {

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 커뮤니티입니다."));
        CommunityUser communityUser = new CommunityUser(user, community);

        communityUserRepository.save(communityUser);
    }

    @Transactional
    public void updateCommunityUserProfile(UpdateCommunityProfileInputDTO updateCommunityProfileInputDTO, Long communityId, Long userId) {
        CommunityUser communityUser = communityUserRepository.findByUserIdAndCommunityId(userId, communityId);
        communityUser.updateProfile(updateCommunityProfileInputDTO);
    }

    @Transactional
    public boolean isFirstVisit(Long userId, Long communityId) {
        return communityUserRepository.findByUserIdAndCommunityId(userId, communityId).getIsFirstVisit();
    }

    @Transactional
    public void updateIsFirstVisit(Long userId, Long communityId) {
        CommunityUser communityUser = communityUserRepository.findByUserIdAndCommunityId(userId, communityId);
        communityUser.updateIsFirstVisit();
    }
}
