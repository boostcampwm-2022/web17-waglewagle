package com.waglewagle.rest.keyword.association;

import com.waglewagle.rest.keyword.Keyword;

import java.util.List;

public class CollaborativeFiltering implements AssociationCalculator {
    @Override
    public List<AssociationDTO> getSortedKeywordList(Keyword baseKeyword, List<Keyword> associatedKeywords) {
        return null;
    }
}
