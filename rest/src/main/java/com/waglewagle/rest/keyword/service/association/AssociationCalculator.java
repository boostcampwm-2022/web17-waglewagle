package com.waglewagle.rest.keyword.service.association;

import com.waglewagle.rest.keyword.data_object.dto.AssociationDTO;
import com.waglewagle.rest.keyword.entity.Keyword;

import java.util.List;

public interface AssociationCalculator {

    List<AssociationDTO>
    getSortedKeywordList(final Keyword baseKeyword,
                         final List<Keyword> associatedKeywords);
}
