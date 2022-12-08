package com.waglewagle.rest.community;

import com.waglewagle.rest.common.PreResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.waglewagle.rest.community.CommunityDTO.*;

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
    public ResponseEntity<List<CommunityResponseDTO>> getJoinedCommunities(@CookieValue("user_id") Long userId) {
        List<Community> communities = communityService.getJoinedCommunities(userId);

        List<CommunityResponseDTO> communityResponseDTOs = CommunityResponseDTO.createCommunityResponseDTOs(communities);
        return new ResponseEntity<>(communityResponseDTOs, HttpStatus.OK);
    }


    @PostMapping("")
    public ResponseEntity createCommunity(@RequestBody CreateCommunityInputDTO createCommunityInputDTO,
                                          @CookieValue("user_id") Long userId) {

        PreResponseDTO<CommunityResponseDTO> preResponseDTO = communityService.createCommunity(userId,
                                                                                               createCommunityInputDTO.getTitle(),
                                                                                               createCommunityInputDTO.getDescription());

        return new ResponseEntity(
                preResponseDTO.getData(),
                preResponseDTO.getHttpStatus()
        );

    }
}
