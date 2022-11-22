package com.waglewagle.rest.keyword.associated;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AssociateCalculatorConfig {

    //1. 어떤걸 빈으로 등록해야 할까?
    //https://kim-jong-hyun.tistory.com/97
    @Bean
    public AssociateCalculator associateCalculator() {
        return new CollaborativeFiltering();
//        return new DumbAssociateCalculator();
    }
}
