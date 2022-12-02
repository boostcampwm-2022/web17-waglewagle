package com.waglewagle.rest.communityUser;

import com.waglewagle.rest.community.CommunityRepository;
import com.waglewagle.rest.community.Community;
import com.waglewagle.rest.user.User;
import com.waglewagle.rest.user.UserRepository;
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
    public boolean isAlreadyJoined(Long userId, Long communityId) {
        return communityUserRepository.findByUserIdAndCommunityId(userId, communityId) != null;
        }


    @Transactional
    public void joinCommunity(Long userId, Long communityId) {

        User user = userRepository.findById(userId);
        Community community = communityRepository.findOneById(communityId);
        CommunityUser communityUser = new CommunityUser(user, community);

        communityUserRepository.save(communityUser);
    }

    }
}
