package com.waglewagle.rest.keyword.controller;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.keyword.data_object.dto.AssociationDTO;
import com.waglewagle.rest.keyword.data_object.dto.request.KeywordRequest;
import com.waglewagle.rest.keyword.data_object.dto.response.KeywordResponse;
import com.waglewagle.rest.keyword.service.KeywordService;
import com.waglewagle.rest.keyword.service.KeywordUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/v1/keyword") //정확한 표현법좀???
@RequiredArgsConstructor
public class KeywordController {

    private final KeywordService keywordService;
    private final KeywordUserService keywordUserService;

    /**
     * 키워드 생성
     * 11.29
     */
    @ResponseBody
    @PostMapping("")
    public ResponseEntity<KeywordResponse.KeywordDTO>
    createKeyword(@RequestBody final KeywordRequest.CreateDTO createDTO,
                  @CookieValue("user_id") final Long userId) {

        String keywordName = createDTO.getKeywordName();
        Long communityId = createDTO.getCommunityId();

        PreResponseDTO<KeywordResponse.KeywordDTO>
                preResponseDTO = keywordService.createKeyword(userId, communityId, keywordName);

        return new ResponseEntity<>(
                preResponseDTO.getData(),
                preResponseDTO.getHttpStatus());
    }

    //spring controller parameter
    //https://velog.io/@junbee/Spring-MVC-%EA%B8%B0%EB%B3%B8-%EA%B8%B0%EB%8A%A52-%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0-%EC%B2%98%EB%A6%AC
    //ResponseEntity
    //https://velog.io/@alstn_dev/Spring-Boot%EB%A1%9C-REST-API-%EC%84%9C%EB%B2%84-%EB%A7%8C%EB%93%A4%EA%B8%B0
    @ResponseBody
    @GetMapping("/associations")
    public ResponseEntity<List<AssociationDTO>>
    getAssociatedKeywords(@RequestParam("keyword-id") final Long keywordId) {

        PreResponseDTO<List<AssociationDTO>>
                preResponseDTO = keywordService.calcAssociatedKeywordsByKeyword(keywordId);

        return new ResponseEntity<>(
                preResponseDTO.getData(),
                preResponseDTO.getHttpStatus());
    }

    @ResponseBody
    @GetMapping("/{community_id}")
    public ResponseEntity<List<KeywordResponse.KeywordMemberCountDTO>>
    getAllKeywordInCommunity(@PathVariable("community_id") final Long communityId) {

        PreResponseDTO<List<KeywordResponse.KeywordMemberCountDTO>>
                preResponseDTO = keywordService.getKeywordListInCommunity(communityId);

        return new ResponseEntity(
                preResponseDTO.getData(),
                preResponseDTO.getHttpStatus());
    }

    /**
     * 키워드 참가
     * 11.29
     */
    @ResponseBody
    @PostMapping("/join")
    public ResponseEntity<String>
    joinKeyword(@RequestBody final KeywordRequest.JoinDTO joinDTO,
                @CookieValue("user_id") final Long userId) {

        keywordService.joinKeyword(joinDTO, userId);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    /**
     * 키워드 참가 취소s
     * 11.29
     */
    @ResponseBody
    @DeleteMapping("/disjoin")
    public ResponseEntity<String>
    disjoinKeyword(@RequestBody final KeywordRequest.DisjoinDTO disjoinDTO,
                   @CookieValue("user_id") Long userId) {

        keywordUserService.disjoinKeyword(disjoinDTO, userId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user/{community_id}")
    public ResponseEntity
    getJoinedKeywords(@PathVariable("community_id") final Long communityId,
                      @CookieValue("user_id") final Long userId) {

        PreResponseDTO<List<KeywordResponse.KeywordDTO>>
                preResponseDTO = keywordService.getJoinedKeywords(userId, communityId);

        return new ResponseEntity(
                preResponseDTO.getData(),
                preResponseDTO.getHttpStatus());
    }

    @PutMapping("/merge")
    public ResponseEntity
    mergeKeywords(@CookieValue("user_id") final Long userId,
                  @RequestBody final KeywordRequest.MergeDTO mergeDTO) {

        keywordService.keywordMerge(mergeDTO, userId);
        return new ResponseEntity<>(
                HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity
    deleteKeywords(@CookieValue("user_id") final Long userId,
                   @RequestBody final KeywordRequest.DeleteDTO deleteDTO) {

        keywordService.deleteKeyword(deleteDTO, userId);

        return new ResponseEntity(HttpStatus.OK);
    }
}
