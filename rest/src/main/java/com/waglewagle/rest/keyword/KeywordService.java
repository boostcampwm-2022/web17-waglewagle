package com.waglewagle.rest.keyword;

import com.waglewagle.rest.keyword.associated.AssociateCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KeywordService {

    private final KeywordRepository keywordRepository;
    private final AssociateCalculator associateCalculator;

    public List<Keyword> calcAssociatedKeywords(Long baseKeywordId) {

        //db 조회

        //계산
        List<Keyword> result = associateCalculator.test();

        return null;
    }
}
