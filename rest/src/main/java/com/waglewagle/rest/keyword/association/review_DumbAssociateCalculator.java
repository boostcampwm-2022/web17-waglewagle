package com.waglewagle.rest.keyword.association;

import com.waglewagle.rest.keyword.Keyword;

import java.util.*;

public class review_DumbAssociateCalculator implements AssociationCalculator {

    //*review:
        //매개변수 객체는 Keyword, 리턴 객체는 AssociationDTO,
        //AssociationDTO에 count라는 변수를 넣지 않고 정렬하고 싶은데 잘 안되네요;;
        //이 java파일에 public하지 않은 중간 경유(?)용 class를 둘까 싶기도하고(Keyword > 임시 객체 > AssociationDTO)
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

        //이거 소팅하면서 내림차순 정렬하는게 아니라, 소팅 따로 뒤집기 따로 아닐까(비효율이란 거지)
        returnList.sort((Comparator.comparing(AssociationDTO::getCount).reversed()));

        int rank = 1;
        for (AssociationDTO elem : returnList) {
            elem.setRank(rank);
            rank++;
        }

        return returnList;
    }
}
