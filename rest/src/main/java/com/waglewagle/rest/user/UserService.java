package com.waglewagle.rest.user;

import com.waglewagle.rest.communityUser.CommunityUser;
import com.waglewagle.rest.communityUser.CommunityUserRepository;
import com.waglewagle.rest.keywordUser.KeywordUser;
import com.waglewagle.rest.user.dto.UpdateProfileDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.waglewagle.rest.user.dto.UserInfoDTO.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CommunityUserRepository communityUserRepository;

    @Transactional
    public Long authenticateWithUsername(String username) {
        Long userId = userRepository.findOrSaveUsername(username);
        return userId;
    }

    Cookie createUserIdCookie(Long userId) {
        Cookie userIdCookie =new Cookie("user_id", Long.toString(userId));
        userIdCookie.setMaxAge(3600 * 1000);
        userIdCookie.setPath("/");
        userIdCookie.setHttpOnly(true);
//        userIdCookie.setSecure(true);
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

    @Transactional
    public UserInfoResDTO getUserInfo(Long userId, Long communityId) {
        User user = userRepository.findById(userId);
        CommunityUser communityUser = communityUserRepository.findByUserIdAndCommunityId(userId, communityId);

        //TODO: null에 대한 Http 'Bad Request(or No Content?)'처리가 필요함(지금은 Conroller에서 Http.ok(200)에 null만 태워서 보냄)
        if (Objects.isNull(user)) {
            return null;
        }

        return new UserInfoResDTO(user, communityUser);
    }

    public List<KeywordUser> getUserKeywords(Long userId) {
        User user = userRepository.findById(userId);
        return null;
    }

    @Transactional
    public void updateLastActivity(Long userId) {
        User user = userRepository.findById(userId);

        user.updateLastActivity();

    }
}
