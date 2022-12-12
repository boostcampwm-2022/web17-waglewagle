package com.waglewagle.rest.community.controller;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.community.data_object.dto.request.CommunityRequest;
import com.waglewagle.rest.community.data_object.dto.response.CommunityResponse;
import com.waglewagle.rest.community.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping("/api/v1/community")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;

    /**
     * 유저가 참여 중인 커뮤니티 보기
     * 12.02 03:06
     */
    @GetMapping("")
    public ResponseEntity<List<CommunityResponse.CommunityDTO>>
    getJoinedCommunities(@CookieValue("user_id") final Long userId) {

        PreResponseDTO<List<CommunityResponse.CommunityDTO>>
                preResponseDTO = communityService.getJoinedCommunities(userId);

        return new ResponseEntity<>(
                preResponseDTO.getData(),
                preResponseDTO.getHttpStatus());
    }


    @PostMapping("")
    public ResponseEntity<CommunityResponse.CommunityDTO>
    createCommunity(@RequestBody final CommunityRequest.CreateDTO createDTO,
                    @CookieValue("user_id") final Long userId) {

        if (!createDTO.isValid()) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        PreResponseDTO<CommunityResponse.CommunityDTO>
                preResponseDTO = communityService.createCommunity(userId,
                createDTO.getTitle(),
                createDTO.getDescription());

        return new ResponseEntity(
                preResponseDTO.getData(),
                preResponseDTO.getHttpStatus()
        );

    }
}
