package com.waglewagle.rest.user;

import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.Optional;

@SpringBootTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

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
        Long userId = userRepository.findOrSaveUsername("asdf");
        Long wrongUserId = 1000000L;

        // when
        User findUser = null;
        Optional<User> optFindUser = userRepository.findById(userId);
        if (optFindUser.isPresent())
            findUser = optFindUser.get();

        User notFindUser = null;
        Optional<User> optNotFindUser = userRepository.findById(wrongUserId);
        if (optNotFindUser.isPresent())
            notFindUser = optNotFindUser.get();

        // then
        Assertions.assertThat(findUser.getId()).isEqualTo(userId);
        Assertions.assertThat(notFindUser).isNull();


    }
}
