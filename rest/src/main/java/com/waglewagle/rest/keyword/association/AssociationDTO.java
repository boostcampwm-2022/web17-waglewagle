package com.waglewagle.rest.keyword.association;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@Getter @ToString
//@RequiredArgsConstructor TODO: RequiredArgsConstructor 문제점? - https://dev-code-notepad.tistory.com/153
public class AssociationDTO {
    String keywordId;
    String keywordName;
    Integer rank;
}
