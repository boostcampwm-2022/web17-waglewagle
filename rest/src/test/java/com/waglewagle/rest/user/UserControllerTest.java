package com.waglewagle.rest.user;

import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.community.repository.CommunityRepository;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.repository.UserRepository;
import com.waglewagle.rest.user.service.UserService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommunityRepository communityRepository;

    @Test
    @DisplayName("GET user/me - FAIL : 유저가(cookie) 해당 커뮤니티에 가입하지 않은 경우")
    void getUserMeFail() throws Exception {

        //Before : 유저 생성, 커뮤니티 생성(유저가 가입하지 않은 커뮤니티)
        User user = userRepository.save(User.builder()
                .username("hodaessi")
                .build()); //TODO: 객체생성에 있어서, 어느정도 프로젝트 생성 스펙(?)을 따를것
        Community community = communityRepository.save(new Community()); //TODO: 객체생성에 있어서, 어느정도 프로젝트 생성 스펙(?)을 따를것

        //Given : user_id(쿠키), community-id
        Cookie cookie = new Cookie("user_id", String.valueOf(user.getId()));

        //When : 유저 자신의 프로필을 조회 했을 때,
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/user/me")
                .cookie(cookie)
                .contentType(MediaType.APPLICATION_JSON)
                .queryParam("community-id", String.valueOf(0)));

        //Then : 401에러(Unauthorized) TODO: 403이 더 적절해 보이는데?
        result.andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    void authenticateWithUsername() {
        // given
        String username = "asdf";
        String anotherUsername = "asdfe";

        // when
        Long userId = userService.authenticateWithUsername(username);
        Long alreadySavedUserId = userService.authenticateWithUsername(username);
        Long novelUserId = userService.authenticateWithUsername(anotherUsername);

        // then
        Assertions.assertThat(userId).isPositive();
        Assertions.assertThat(userId).isEqualTo(alreadySavedUserId);
        Assertions.assertThat(userId).isNotEqualTo(novelUserId);
    }
}