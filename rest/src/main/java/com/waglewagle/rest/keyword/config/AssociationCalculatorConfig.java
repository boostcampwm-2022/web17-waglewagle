package com.waglewagle.rest.keyword.config;

import com.waglewagle.rest.keyword.service.association.AssociationCalculator;
import com.waglewagle.rest.keyword.service.association.DumbAssociateCalculator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AssociationCalculatorConfig {

    //1. 어떤걸 빈으로 등록해야 할까?
    //https://kim-jong-hyun.tistory.com/97
    //2. 빈과 컴포넌트 차이?
    //3. 빈 등록방식 정리(바이트코드) >> 빈 말고 컴포넌트로도 등록 가능한 듯?
    @Bean
    public AssociationCalculator associationCalculator() {

//        return new CollaborativeFiltering();
        return new DumbAssociateCalculator();
    }
}
