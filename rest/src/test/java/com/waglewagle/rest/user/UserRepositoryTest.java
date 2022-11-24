package com.waglewagle.rest.user;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserRepositoryTest {

    @Autowired private UserRepository userRepository;

    @Test
    @Transactional
    void findOrSaveUsername() {
        // given
        String username = "asdf";
        String anotherUsername = "asdfe";

        // when
        Long userId = userRepository.findOrSaveUsername(username);
        Long alreadySavedUserId = userRepository.findOrSaveUsername(username);
        Long NovelUserId = userRepository.findOrSaveUsername(anotherUsername);

        // then
        Assertions.assertThat(userId).isPositive();
        Assertions.assertThat(userId).isEqualTo(alreadySavedUserId);
        Assertions.assertThat(userId).isNotEqualTo(NovelUserId);
    }

    @Test
    @Transactional
    void findById() {
        // given
        Long userId =userRepository.findOrSaveUsername("asdf");
        Long wrongUserId = 1000000L;

        // when
        User userFoundById = userRepository.findById(userId);
        User userNotFound = userRepository.findById(wrongUserId);

        // then
        Assertions.assertThat(userFoundById.getId()).isEqualTo(userId);
        Assertions.assertThat(userNotFound).isNull();


    }
}
