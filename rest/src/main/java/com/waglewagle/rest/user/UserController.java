package com.waglewagle.rest.user;

import com.waglewagle.rest.user.dto.LoginResponseDTO;
import com.waglewagle.rest.user.dto.UsernameLoginDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/api/v1/user/*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    @ResponseBody
    public LoginResponseDTO authenticateWithUsername(HttpServletResponse response, @RequestBody UsernameLoginDTO usernameLoginDTO) {

        String username = usernameLoginDTO.getUsername();
        Long userId = userService.authenticateWithUsername(username);

        Cookie userIdCookie = userService.createUserIdCookie(userId);
        response.addCookie(userIdCookie);

        LoginResponseDTO loginResponseDTO = new LoginResponseDTO(true, userId);
        return loginResponseDTO;
    }
}
