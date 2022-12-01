package com.waglewagle.rest.user;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class UserControllerTest {

    @Autowired private UserService userService;

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