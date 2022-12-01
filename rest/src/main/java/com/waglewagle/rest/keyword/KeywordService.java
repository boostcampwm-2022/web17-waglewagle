package com.waglewagle.rest.keyword;

import com.waglewagle.rest.community.Community;
import com.waglewagle.rest.community.CommunityRepository;
import com.waglewagle.rest.keyword.KeywordDTO.*;
import com.waglewagle.rest.keyword.association.AssociationCalculator;
import com.waglewagle.rest.keyword.association.AssociationDTO;
import com.waglewagle.rest.keywordUser.KeywordUser;
import com.waglewagle.rest.keywordUser.KeywordUserRepository;
import com.waglewagle.rest.user.User;
import com.waglewagle.rest.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KeywordService {

    private final KeywordRepository keywordRepository;
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;

    private final AssociationCalculator associationCalculator;

    //1. base키워드(선택된 키워드)기반
    @Transactional(readOnly = true)
    public List<AssociationDTO> calcAssociatedKeywordsByKeyword(Long baseKeywordId) {

        Keyword baseKeyword = keywordRepository.findOne(baseKeywordId);
        List<Keyword> associatedKeywords = keywordRepository.findAssociatedKeywords(baseKeyword);

        return associationCalculator.getSortedKeywordList(baseKeyword, associatedKeywords);
    }

    //2. 유저기반(유저가 선택한 키워드들에 연관된)
    public List<Keyword> calcAssociatedKeywordsByUser(Long userId) {

        return null;
    }

    @Transactional(readOnly = true)
    public List<KeywordDTO> getKeywordListInCommunity(Long communityId) {

        List<Keyword> allKeywordInCommunity = keywordRepository.findAllByCommunityId(communityId);
        List<KeywordDTO> responseList = new ArrayList<>();

        for (Keyword keyword : allKeywordInCommunity) {

            responseList.add(
                    new KeywordDTO(
                            String.valueOf(keyword.getId()),
                            keyword.getKeyword(),
                            keyword.getKeywordUsers().size() //TODO: N+1?
            ));
        }

        return responseList;
    }

    @Transactional
    public boolean isDuplicated(KeywordDTO.CreateKeywordInputDTO createKeywordInputDTO) {
        return keywordRepository.isKeywordDuplicated(createKeywordInputDTO);
    }

    @Transactional
    public Keyword createKeyword(Long userId, Long communityId, String keywordName) {
        User user = userRepository.findById(userId);
        Community community = communityRepository.findOneById(communityId);

        CreateKeywordDTO createKeywordDTO = CreateKeywordDTO.createCreateKeywordDTO(user, community, keywordName);
        Keyword keyword = new Keyword(createKeywordDTO);

        // TODO: 이렇게 암시적으로 비즈니스 로직이 실행되어도 되는 지 모르겠다.
        JoinKeywordDTO joinKeywordDTO = JoinKeywordDTO.createJoinKeywordDTO(user, community, keyword);
        KeywordUser keywordUser = new KeywordUser(joinKeywordDTO);

        keyword.addKeywordUser(keywordUser);
        keywordRepository.saveKeyword(keyword);
//        keywordUserRepository.joinKeyword(joinKeywordDTO);

        return keyword;
    }

    //TODO: jpa 더티체킹
    @Transactional
    public void joinKeyword(JoinKeywordInputDTO joinKeywordInputDTO, Long userId) {
        // private Long keywordId;
        // private Long communityId;
        Keyword keyword = keywordRepository.findOne(joinKeywordInputDTO.getKeywordId());
        Community community = communityRepository.findOneById(joinKeywordInputDTO.getCommunityId());
        User user = userRepository.findById(userId);

        JoinKeywordDTO joinKeywordDTO = JoinKeywordDTO.createJoinKeywordDTO(user, community, keyword);

        keyword.addKeywordUser(new KeywordUser(joinKeywordDTO));
    }
}
