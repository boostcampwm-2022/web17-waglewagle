package com.waglewagle.rest.user.controller;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.user.data_object.dto.request.UserRequest;
import com.waglewagle.rest.user.data_object.dto.response.UserResponse;
import com.waglewagle.rest.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.List;


@Controller
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<UserResponse.LoginDTO> authenticateWithUsername(@RequestBody UserRequest.UsernameLoginDTO usernameLoginDTO,
                                                                          HttpServletResponse response) {

        String username = usernameLoginDTO.getUsername();
        Long userId = userService.authenticateWithUsername(username);

        Cookie userIdCookie = userService.createUserIdCookie(userId);
        response.addCookie(userIdCookie);

        UserResponse.LoginDTO loginDTO = UserResponse.LoginDTO.from(true, userId);
        return ResponseEntity.ok(loginDTO);
    }

    @PutMapping("/profile")
    @ResponseBody
    public ResponseEntity<UserResponse.UpdateProfileDTO> updateProfile(@RequestBody UserRequest.UpdateProfileDTO updateProfileDTO,
                                                                       @CookieValue(name = "user_id") Long userId) {

        if (updateProfileDTO.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        PreResponseDTO<UserResponse.UpdateProfileDTO> preResponseDTO = userService.updateUserProfile(userId, updateProfileDTO);

        return new ResponseEntity<>(preResponseDTO.getData(), preResponseDTO.getHttpStatus());
    }

    @GetMapping("/me")
    @ResponseBody
    public ResponseEntity<UserResponse.UserInfoDTO> getUserInfo(@CookieValue(name = "user_id") Long userId,
                                                                @RequestParam(name = "community-id", required = false) Long communityId) {

        PreResponseDTO<UserResponse.UserInfoDTO> preResponseDTO = userService.getUserInfo(userId, communityId);

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

        List<UserResponse.LastActivityDTO> lastActivityDTOS = userService.getUserInfoInKeyword(keywordId);

        return new ResponseEntity(lastActivityDTOS, HttpStatus.OK);
    }

    @GetMapping("community")
    public ResponseEntity getUserInfoInCommunity(@RequestParam("community-id") Long communityId) {

        List<UserResponse.LastActivityDTO> lastActivityDTOS = userService.getUserInfoInCommunity(communityId);

        return new ResponseEntity(lastActivityDTOS, HttpStatus.OK);
    }
}
