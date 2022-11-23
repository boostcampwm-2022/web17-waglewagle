package com.waglewagle.rest.keyword.association;

import com.waglewagle.rest.keyword.Keyword;

import java.util.*;

public class DumbAssociateCalculator implements AssociationCalculator {

    @Override
    public List<AssociationDTO> getSortedKeywordList(Keyword baseKeyword, List<Keyword> associatedKeywords) {

        Map<String, Integer> countMap = new HashMap<>();
        Map<String, Keyword> mapping = new HashMap<>();

        for (int i = 0; i < associatedKeywords.size(); i++) {
            if (!Objects.equals(baseKeyword.getKeyword(), associatedKeywords.get(i).getKeyword())) {
                countMap.put(
                        associatedKeywords.get(i).getKeyword(),
                        countMap.getOrDefault(associatedKeywords.get(i).getKeyword(), 0) + 1
                );
                mapping.put(associatedKeywords.get(i).getKeyword(), associatedKeywords.get(i));
            }
        }

        Deque<AssociationDTO> dq = new LinkedList<>();
        List<String> keyList = new ArrayList<>(countMap.keySet());

        dq.addLast(
            new AssociationDTO(
                String.valueOf(mapping.get(keyList.get(0)).getId()),
                mapping.get(keyList.get(0)).getKeyword(),
                countMap.get(keyList.get(0))
            )
        );

        for (int i = 1; i < keyList.size(); i++) {
            if (countMap.get(keyList.get(i)) > countMap.get(dq.getFirst().getKeywordName())) {
                dq.addFirst(
                    new AssociationDTO(
                        String.valueOf(mapping.get(keyList.get(i)).getId()),
                        mapping.get(keyList.get(i)).getKeyword(),
                        countMap.get(keyList.get(i))
                    )
                );
            } else {
                dq.addLast(
                        new AssociationDTO(
                                String.valueOf(mapping.get(keyList.get(i)).getId()),
                                mapping.get(keyList.get(i)).getKeyword(),
                                countMap.get(keyList.get(i))
                        )
                );
            }
        }

        return new ArrayList<>(dq);
    }
}
