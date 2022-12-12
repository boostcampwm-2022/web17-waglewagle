package com.waglewagle.rest.keyword.service.association;

import com.waglewagle.rest.keyword.data_object.dto.AssociationDTO;
import com.waglewagle.rest.keyword.entity.Keyword;

import java.util.*;

public class DumbAssociateCalculator implements AssociationCalculator {

    @Override
    public List<AssociationDTO>
    getSortedKeywordList(final Keyword baseKeyword,
                         final List<Keyword> associatedKeywords) {

        Map<String, AssociationDTO> tempMap = new HashMap<>();
        List<AssociationDTO> returnList = new ArrayList<>();

        for (Keyword keyword : associatedKeywords) {
            if (!keyword.getKeyword().equals(baseKeyword.getKeyword())) {
                tempMap.computeIfAbsent(keyword.getKeyword(), k -> new AssociationDTO(
                        String.valueOf(keyword.getId()),
                        keyword.getKeyword(),
                        0,
                        0
                ));

                tempMap.get(keyword.getKeyword()).setCount(
                        tempMap.get(keyword.getKeyword()).getCount() + 1
                );
            }
        }

        for (String key : tempMap.keySet()) {
            returnList.add(tempMap.get(key));
        }

        returnList.sort((Comparator.comparing(AssociationDTO::getCount).reversed()));

        int rank = 1;
        for (AssociationDTO elem : returnList) {
            elem.setRank(rank);
            rank++;
        }

        if (returnList.size() > 10) {
            returnList = returnList.subList(0, 10);
        }

        return returnList;
    }
}
