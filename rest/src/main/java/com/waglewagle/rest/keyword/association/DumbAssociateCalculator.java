package com.waglewagle.rest.keyword.association;

import com.waglewagle.rest.keyword.Keyword;

import java.util.*;

public class DumbAssociateCalculator implements AssociationCalculator {

    @Override
    public List<AssociationDTO> getSortedKeywordList(Keyword baseKeyword, List<Keyword> associatedKeywords) {

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

        return returnList;
    }
}
