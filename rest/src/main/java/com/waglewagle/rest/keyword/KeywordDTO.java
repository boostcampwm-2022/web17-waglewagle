package com.waglewagle.rest.keyword;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class KeywordDTO {
    String keywordId;
    String keywordName;
    Integer memberCount;
}
