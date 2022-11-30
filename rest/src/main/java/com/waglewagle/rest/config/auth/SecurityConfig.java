package com.waglewagle.rest.config.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
//https://velog.io/@kimsy8979/%EC%8A%A4%ED%94%84%EB%A7%81-%EB%B6%80%ED%8A%B8%EC%99%80-AWS%EB%A1%9C-%ED%98%BC%EC%9E%90-%EA%B5%AC%ED%98%84%ED%95%98%EB%8A%94-%EC%9B%B9%EC%84%9C%EB%B9%84%EC%8A%A4-%ED%9B%84%EA%B8%B0-12#220816-%EC%B6%94%EA%B0%80%EC%A0%81%EC%9D%B8-%EC%B0%A8%EC%9D%B4-%EB%B0%9C%EA%B2%AC---%EC%98%88%EC%95%BD%EC%96%B4
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean //어케 스캔되는거임(@Configuration과 어케 연동되는거?)
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().disable() //TODO: csrf?
                .headers().frameOptions().disable()
                .and()
                .authorizeRequests().anyRequest().permitAll()
                .and()
                .logout(logout -> logout
                        .logoutSuccessUrl("/")) //TODO: http://www.waglewagle.link/ ???
                .oauth2Login(oauth2Login -> oauth2Login
                        .userInfoEndpoint()
                        .userService(customOAuth2UserService))
                .build();
    }

}