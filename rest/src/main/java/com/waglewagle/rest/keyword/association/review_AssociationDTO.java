package com.waglewagle.rest.keyword.association;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter @Setter
@ToString
public class review_AssociationDTO {
    String keywordId;
    String keywordName;
    //DumbAssociateCalculator와 의존성이 짙어지는 것 같아 나중에 지울 변수
    Integer count;
    Integer rank;
}
