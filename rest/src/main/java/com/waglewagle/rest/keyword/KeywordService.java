package com.waglewagle.rest.keyword;

import com.waglewagle.rest.keyword.association.AssociationCalculator;
import com.waglewagle.rest.keyword.association.AssociationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KeywordService {

    private final KeywordRepository keywordRepository;

    private final AssociationCalculator associationCalculator;

    //1. base키워드(선택된 키워드) 기반
    //org.hibernate.LazyInitializationException: could not initialize proxy
        //엔티티 생명주기 ~ @Transactional 관계
        //Fetch.LAZY에 대해서(~ @Transactional)
    //TODO: 읽기만하는데도 @transactional이 필요할까???
    public List<AssociationDTO> calcAssociatedKeywordsByKeyword(Long baseKeywordId) {

        Keyword baseKeyword = keywordRepository.findOne(baseKeywordId);
        List<Keyword> associatedKeywords = keywordRepository.findAssociatedKeywords(baseKeyword);

        return associationCalculator.getSortedKeywordList(baseKeyword, associatedKeywords);
    }

    //2. 유저기반(유저가 선택한 키워드들에 연관된)
    public List<Keyword> calcAssociatedKeywordsByUser(Long userId) {

        return null;
    }

    //TODO: N+1 문제에 해당되는지 체크(각 keyword마다 keywordUser 테이블 조회할 때)
    //TODO: stream사용해서 함수형으로 짜
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
//        return allKeywordInCommunity.stream().forEach(keyword -> new KeywordDTO(keyword.getId().toString(), keyword.getKeyword(), keyword.getKeywordUsers().size())).collect(Collectors.toList());
    }
}
