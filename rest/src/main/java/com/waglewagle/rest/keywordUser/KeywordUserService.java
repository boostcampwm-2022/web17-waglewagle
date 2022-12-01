package com.waglewagle.rest.keywordUser;


import com.waglewagle.rest.community.Community;
import com.waglewagle.rest.community.CommunityRepository;
import com.waglewagle.rest.keyword.Keyword;
import com.waglewagle.rest.keyword.KeywordDTO.*;
import com.waglewagle.rest.keyword.KeywordRepository;
import com.waglewagle.rest.user.User;
import com.waglewagle.rest.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class KeywordUserService {

    private final KeywordRepository keywordRepository;
    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;
    private final KeywordUserRepository keywordUserRepository;

    @Transactional
    public void disjoinKeyword(DisjoinKeywordDTO disjoinKeywordDTO, Long userId) {

        Keyword keyword = keywordRepository.findOne(disjoinKeywordDTO.getKeywordId());
        Community community = communityRepository.findOneById(disjoinKeywordDTO.getCommunityId());
        User user = userRepository.findById(userId);

        keywordUserRepository.deleteByKeywordAndCommunityAndUser(keyword, community, user);
    }
}
