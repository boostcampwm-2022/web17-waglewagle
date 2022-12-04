package com.waglewagle.rest.user;

import com.waglewagle.rest.user.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

import static com.waglewagle.rest.user.dto.UserInfoDTO.*;

@Controller
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<LoginResponseDTO> authenticateWithUsername(@RequestBody UsernameLoginDTO usernameLoginDTO,
                                                                     HttpServletResponse response) {

        String username = usernameLoginDTO.getUsername();
        Long userId = userService.authenticateWithUsername(username);

        Cookie userIdCookie = userService.createUserIdCookie(userId);
        response.addCookie(userIdCookie);

        LoginResponseDTO loginResponseDTO = new LoginResponseDTO(true, userId);
        return ResponseEntity.ok(loginResponseDTO);
    }

    @PutMapping("/profile")
    @ResponseBody
    public ResponseEntity<UpdateProfileResponseDTO> updateProfile(@RequestBody UpdateProfileDTO updateProfileDTO, @CookieValue(name = "user_id") Long userId) {

        if(updateProfileDTO.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        User user = userService.updateUserProfile(userId, updateProfileDTO);
        if (Objects.isNull(user)) {
            return ResponseEntity.badRequest().build();
        }

        UpdateProfileResponseDTO updateProfileResponseDTO = new UpdateProfileResponseDTO(user);

        return ResponseEntity.ok(updateProfileResponseDTO);
    }

    @GetMapping("/me")
    @ResponseBody
    public ResponseEntity<UserInfoResDTO> getUserInfo(@CookieValue(name = "user_id") Long userId,
                                                      @RequestParam("community-id") Long communityId) {

        UserInfoResDTO userInfoDTO = userService.getUserInfo(userId, communityId);

        return ResponseEntity.ok(userInfoDTO);
    }

    @PutMapping("/last-activity")
    public ResponseEntity updateLastActivity(@CookieValue("user_id") Long userId) {
        userService.updateLastActivity(userId);

        return new ResponseEntity(null, HttpStatus.OK);
    }
}
