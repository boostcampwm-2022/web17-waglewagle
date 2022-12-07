package com.waglewagle.rest.user;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.user.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static com.waglewagle.rest.user.dto.UserInfoDTO.UserInfoResDTO;

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

        if (updateProfileDTO.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        PreResponseDTO<UpdateProfileResponseDTO> preResponseDTO = userService.updateUserProfile(userId, updateProfileDTO);

        return new ResponseEntity<>(preResponseDTO.getData(), preResponseDTO.getHttpStatus());
    }

    @GetMapping("/me")
    @ResponseBody
    public ResponseEntity<UserInfoResDTO> getUserInfo(@CookieValue(name = "user_id") Long userId,
                                                      @RequestParam(name="community-id", required= false) Long communityId) {

        PreResponseDTO<UserInfoResDTO> preResponseDTO = userService.getUserInfo(userId, communityId);

        return new ResponseEntity(preResponseDTO.getData(), preResponseDTO.getHttpStatus());
    }

    @PutMapping("/last-activity")
    public ResponseEntity<String> updateLastActivity(@CookieValue("user_id") Long userId) {

        try {
            userService.updateLastActivity(userId);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("keyword")
    public ResponseEntity getUserInfoInKeyword(@RequestParam("keyword-id") Long keywordId) {

        List<UserConnectionStatusDTO> userConnectionStatusDTOS = userService.getUserInfoInKeyword(keywordId);

        return new ResponseEntity(userConnectionStatusDTOS, HttpStatus.OK);
    }

    @GetMapping("community")
    public ResponseEntity getUserInfoInCommunity(@RequestParam("community-id") Long communityId) {

        List<UserConnectionStatusDTO> userConnectionStatusDTOS = userService.getUserInfoInCommunity(communityId);

        return new ResponseEntity(userConnectionStatusDTOS, HttpStatus.OK);
    }
}
