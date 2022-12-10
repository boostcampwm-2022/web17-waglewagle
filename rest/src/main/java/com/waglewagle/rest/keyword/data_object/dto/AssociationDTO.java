package com.waglewagle.rest.keyword.data_object.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class AssociationDTO {
    String keywordId;
    String keywordName;
    //TODO: DumbAssociateCalculator와 의존성이 짙어지는 것 같아 나중에 지울 변수
    Integer count;
    Integer rank;
}
