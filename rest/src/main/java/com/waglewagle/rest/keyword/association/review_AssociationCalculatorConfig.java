package com.waglewagle.rest.keyword.association;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class review_AssociationCalculatorConfig {

    @Bean
    public AssociationCalculator associationCalculator() {

//        return new CollaborativeFiltering();
        return new DumbAssociateCalculator();
    }
}
