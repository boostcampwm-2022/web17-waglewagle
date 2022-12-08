package com.waglewagle.rest.keywordUser;


import com.waglewagle.rest.community.Community;
import com.waglewagle.rest.community.repository.CommunityRepository;
import com.waglewagle.rest.keyword.Keyword;
import com.waglewagle.rest.keyword.KeywordDTO.*;
import com.waglewagle.rest.keyword.KeywordRepository;
import com.waglewagle.rest.user.User;
import com.waglewagle.rest.user.repository.UserRepository;
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

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        Community community = communityRepository.findById(disjoinKeywordDTO.getCommunityId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 커뮤니티입니다."));

        keywordUserRepository.deleteByKeywordAndCommunityAndUser(keyword, community, user);
    }
}
