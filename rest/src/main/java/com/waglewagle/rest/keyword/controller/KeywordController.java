package com.waglewagle.rest.keyword.controller;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.community.service.CommunityService;
import com.waglewagle.rest.community.service.CommunityUserService;
import com.waglewagle.rest.keyword.data_object.dto.AssociationDTO;
import com.waglewagle.rest.keyword.data_object.dto.request.KeywordRequest;
import com.waglewagle.rest.keyword.data_object.dto.response.KeywordResponse;
import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.keyword.service.KeywordService;
import com.waglewagle.rest.keyword.service.KeywordUserService;
import com.waglewagle.rest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api/v1/keyword") //정확한 표현법좀???
@RequiredArgsConstructor
public class KeywordController {

    private final KeywordService keywordService;
    private final CommunityService communityService;
    private final KeywordUserService keywordUserService;
    private final CommunityUserService communityUserService;

    private final UserRepository userRepository;

    /**
     * 키워드 생성
     * 11.29
     */
    @ResponseBody
    @PostMapping("")
    public ResponseEntity<Object>
    createKeyword(@RequestBody final KeywordRequest.CreateDTO createDTO,
                  @CookieValue("user_id") final Long userId) {

        if (keywordService.isDuplicated(createDTO)) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        String keywordName = createDTO.getKeywordName();
        Long communityId = createDTO.getCommunityId();

        try {
            Keyword keyword = keywordService.createKeyword(userId, communityId, keywordName);
            return new ResponseEntity<>(KeywordResponse.KeywordDTO.of(keyword), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    //spring controller parameter
    //https://velog.io/@junbee/Spring-MVC-%EA%B8%B0%EB%B3%B8-%EA%B8%B0%EB%8A%A52-%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0-%EC%B2%98%EB%A6%AC
    //ResponseEntity
    //https://velog.io/@alstn_dev/Spring-Boot%EB%A1%9C-REST-API-%EC%84%9C%EB%B2%84-%EB%A7%8C%EB%93%A4%EA%B8%B0
    @ResponseBody
    @GetMapping("/associations")
    public ResponseEntity<List<AssociationDTO>>
    getAssociatedKeywords(@RequestParam("keyword-id") final Long keywordId) {

        List<AssociationDTO> sortedList = keywordService.calcAssociatedKeywordsByKeyword(keywordId);

        //실패 http status? : 애초에 실패상황은 뭘까
        return ResponseEntity.ok(sortedList);
    }

    @ResponseBody
    @GetMapping("/{community_id}")
    public ResponseEntity<List<KeywordResponse.KeywordMemberCountDTO>>
    getAllKeywordInCommunity(@PathVariable("community_id") final Long communityId) {

        // TODO: Exception Handler
        // return type이 정해져 있어 가에러 메시지를 string이나 객체로 만들 수 없음.
        if (!communityService.isExistCommunity(communityId)) {
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        }

        List<KeywordResponse.KeywordMemberCountDTO>
                keywordListInCommunity = keywordService.getKeywordListInCommunity(communityId);

        if (keywordListInCommunity.isEmpty()) {
            return new ResponseEntity(new ArrayList<>(), HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity(keywordListInCommunity, HttpStatus.OK);
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

        if (!joinDTO.isValid() || userId == null) {
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        }

        try {
            keywordService.joinKeyword(joinDTO, userId);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(null, HttpStatus.CREATED);
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

        try {
            keywordUserService.disjoinKeyword(disjoinDTO, userId);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(null);
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
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity
    deleteKeywords(@CookieValue("user_id") final Long userId,
                   @RequestBody final KeywordRequest.DeleteDTO deleteDTO) {

        keywordService.deleteKeyword(deleteDTO, userId);

        return new ResponseEntity(HttpStatus.OK);
    }
}