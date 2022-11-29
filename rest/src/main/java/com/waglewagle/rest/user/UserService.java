package com.waglewagle.rest.user;

import com.waglewagle.rest.user.dto.UpdateProfileDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public Long authenticateWithUsername(String username) {
        Long userId = userRepository.findOrSaveUsername(username);
        return userId;
    }

    Cookie createUserIdCookie(Long userId) {
        Cookie userIdCookie =new Cookie("user_id", Long.toString(userId));
        userIdCookie.setMaxAge(3600 * 1000);
        userIdCookie.setPath("/");
        return userIdCookie;
    }

    @Transactional
    public User updateUserProfile(Long userId, UpdateProfileDTO updateProfileDTO) {
        User user = userRepository.findById(userId);
        if (Objects.isNull(user)) return null;

        String username = updateProfileDTO.getUsername();
        if (!Objects.isNull(updateProfileDTO.getUsername())) {
            Optional<User> existingUsers = userRepository
                    .findByUsername(username)
                    .stream()
                    .filter(
                            foundUser -> Objects.equals(foundUser.getUsername(), updateProfileDTO.getUsername()))
                    .findFirst();
            if (existingUsers.isPresent()) {
                return null;
            }
        }

        user.updateProfile(updateProfileDTO);
        return user;
    }
}
