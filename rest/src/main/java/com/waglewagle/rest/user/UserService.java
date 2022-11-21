package com.waglewagle.rest.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Long loginWithUsername(String username) {
        Long userId = userRepository.findOrSaveUsername(username);
        return userId;
    }

    Cookie createUserIdCookie(Long userId) {
        Cookie userIdCookie =new Cookie("user_id", Long.toString(userId));
        userIdCookie.setMaxAge(3600 * 1000);
        userIdCookie.setPath("/");
        return userIdCookie;
    }
}
