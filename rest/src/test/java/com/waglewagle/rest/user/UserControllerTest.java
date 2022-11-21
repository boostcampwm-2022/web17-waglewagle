package com.waglewagle.rest.user;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserControllerTest {

    @Autowired private UserService userService;

    @Test
    void loginWithUsername() {
        // given
        String username = "asdf";
        String anotherUsername = "asdfe";

        // when
        Long userId = userService.loginWithUsername(username);
        Long alreadySavedUserId = userService.loginWithUsername(username);
        Long NovelUserId = userService.loginWithUsername(anotherUsername);

        // then
        Assertions.assertThat(userId).isPositive();
        Assertions.assertThat(userId).isEqualTo(alreadySavedUserId);
        Assertions.assertThat(userId).isNotEqualTo(NovelUserId);
    }
}