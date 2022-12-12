package com.waglewagle.rest.keyword.service;


import com.waglewagle.rest.common.exception.InvalidInputException;
import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.community.repository.CommunityRepository;
import com.waglewagle.rest.keyword.data_object.dto.request.KeywordRequest;
import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.keyword.exception.NoSuchKeywordException;
import com.waglewagle.rest.keyword.repository.KeywordRepository;
import com.waglewagle.rest.keyword.repository.KeywordUserRepository;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

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

        Long keywordId = Optional
                .ofNullable(disjoinDTO.getKeywordId())
                .orElseThrow(InvalidInputException::new);
        Long communityId = Optional
                .ofNullable(disjoinDTO.getCommunityId())
                .orElseThrow(InvalidInputException::new);
        Keyword keyword = keywordRepository
                .findById(keywordId)
                .orElseThrow(NoSuchKeywordException::new);
        User user = userRepository
                .findById(userId)
                .orElseThrow(IllegalArgumentException::new);
        Community community = communityRepository
                .findById(communityId)
                .orElseThrow(IllegalArgumentException::new);

        keywordUserRepository.deleteByKeywordAndCommunityAndUser(keyword, community, user);
    }
}
