package com.waglewagle.rest.keyword.association;

import com.waglewagle.rest.keyword.Keyword;

import java.util.List;

public interface AssociationCalculator {

    List<AssociationDTO> getSortedKeywordList(Keyword baseKeyword, List<Keyword> associatedKeywords);
}
