package com.waglewagle.rest.keyword.service;


import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.community.repository.CommunityRepository;
import com.waglewagle.rest.keyword.data_object.dto.request.KeywordRequest;
import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.keyword.repository.KeywordRepository;
import com.waglewagle.rest.keyword.repository.KeywordUserRepository;
import com.waglewagle.rest.user.entity.User;
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
    public void
    disjoinKeyword(final KeywordRequest.DisjoinDTO disjoinDTO,
                   final Long userId) {

        Keyword keyword = keywordRepository.findOne(disjoinDTO.getKeywordId());

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        Community community = communityRepository.findById(disjoinDTO.getCommunityId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 커뮤니티입니다."));

        keywordUserRepository.deleteByKeywordAndCommunityAndUser(keyword, community, user);
    }
}
