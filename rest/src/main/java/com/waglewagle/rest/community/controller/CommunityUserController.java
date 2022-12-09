package com.waglewagle.rest.community.controller;

import com.waglewagle.rest.community.data_object.dto.request.CommunityUserRequest;
import com.waglewagle.rest.community.service.CommunityUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


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
    public ResponseEntity<String>
    joinCommunity(@RequestBody final CommunityUserRequest.JoinDTO joinDTO,
                  @CookieValue("user_id") final Long userId) {

        Long communityId = Long.parseLong(joinDTO.getCommunityId());

        if (communityUserService.isJoined(userId, communityId)) {
            return new ResponseEntity<>(null, HttpStatus.OK); //TODO: TEMP FOR DEMO
//             return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        try {
            communityUserService.joinCommunity(userId, communityId);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }

    /**
     * 커뮤니티 프로필 수정하기
     */
    @PutMapping("/{community_id}/profile")
    public ResponseEntity
    updateCommunityUserProfile(@RequestBody final CommunityUserRequest.UpdateProfileDTO updateProfileDTO,
                               @PathVariable("community_id") final Long communityId,
                               @CookieValue("user_id") final Long userId) {

        if (updateProfileDTO.isEmpty()) {
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        }
        if (!communityUserService.isJoined(userId, communityId)) {
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        }

        communityUserService.updateCommunityUserProfile(updateProfileDTO, communityId, userId);

        return new ResponseEntity(null, HttpStatus.OK);
    }

    @PutMapping("{community_id}/first-visit")
    public ResponseEntity
    updateIsFirstVisit(@PathVariable("community_id") final Long communityId,
                       @CookieValue("user_id") final Long userId) {

        if (!communityUserService.isJoined(userId, communityId)) {
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        }
        if (!communityUserService.isFirstVisit(userId, communityId)) {
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        }

        communityUserService.updateIsFirstVisit(userId, communityId);

        return new ResponseEntity(null, HttpStatus.OK);
    }

}
