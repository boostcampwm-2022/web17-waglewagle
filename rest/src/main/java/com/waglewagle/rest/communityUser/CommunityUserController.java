package com.waglewagle.rest.communityUser;

import com.waglewagle.rest.communityUser.CommunityUserDTO.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/community-user")
@RequiredArgsConstructor
public class CommunityUserController {

        private final CommunityUserService communityUserService;

    /**
     * 커뮤니티 가입하기
     * communityId: string
     */
    @PostMapping("")
    public ResponseEntity joinCommunity(@RequestBody JoinCommunityInputDTO joinCommunityInputDTO, @CookieValue("user_id") Long userId) {
            Long communityId = Long.parseLong(joinCommunityInputDTO.getCommunityId());

            if (!communityUserService.joinCommunity(userId, communityId)) {
                return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity(null, HttpStatus.CREATED);
        }
}
