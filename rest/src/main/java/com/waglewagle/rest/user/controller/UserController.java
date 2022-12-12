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
    public ResponseEntity<UserResponse.LoginDTO>
    authenticateWithUsername(@RequestBody final UserRequest.UsernameLoginDTO usernameLoginDTO,
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
    public ResponseEntity<UserResponse.UpdateProfileDTO>
    updateProfile(@RequestBody final UserRequest.UpdateProfileDTO updateProfileDTO,
                  @CookieValue(name = "user_id") final Long userId) {

        if (updateProfileDTO.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        PreResponseDTO<UserResponse.UpdateProfileDTO>
                preResponseDTO = userService.updateUserProfile(userId, updateProfileDTO);

        return new ResponseEntity<>(
                preResponseDTO.getData(),
                preResponseDTO.getHttpStatus());
    }

    @GetMapping("/me")
    @ResponseBody
    public ResponseEntity<UserResponse.UserInfoDTO>
    getUserInfo(@CookieValue(name = "user_id") final Long userId,
                @RequestParam(name = "community-id", required = false) final Long communityId) {

        PreResponseDTO<UserResponse.UserInfoDTO>
                preResponseDTO = userService.getUserInfo(userId, communityId);

        return new ResponseEntity(
                preResponseDTO.getData(),
                preResponseDTO.getHttpStatus());
    }

    @PutMapping("/last-activity")
    public ResponseEntity<String>
    updateLastActivity(@CookieValue("user_id") final Long userId) {

        userService.updateLastActivity(userId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("keyword")
    public ResponseEntity<List<UserResponse.LastActivityDTO>>
    getUserInfoInKeyword(@RequestParam("keyword-id") final Long keywordId) {

        List<UserResponse.LastActivityDTO>
                lastActivityDTOS = userService.getUserInfoInKeyword(keywordId);

        return new ResponseEntity<>(
                lastActivityDTOS,
                HttpStatus.OK);
    }

    @GetMapping("community")
    public ResponseEntity<List<UserResponse.LastActivityDTO>>
    getUserInfoInCommunity(@RequestParam("community-id") final Long communityId) {

        List<UserResponse.LastActivityDTO>
                lastActivityDTOS = userService.getUserInfoInCommunity(communityId);

        return new ResponseEntity(
                lastActivityDTOS,
                HttpStatus.OK);
    }
}
