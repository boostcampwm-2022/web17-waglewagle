package com.waglewagle.rest.keyword;

import com.waglewagle.rest.keyword.association.AssociationCalculator;
import com.waglewagle.rest.keyword.association.AssociationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KeywordService {

    private final KeywordRepository keywordRepository;

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
                            keyword.getKeywordUsers().size()
                    )
            );
        }

        return responseList;
    }
}
