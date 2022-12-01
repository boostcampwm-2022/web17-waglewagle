package com.waglewagle.rest.keyword;

import com.waglewagle.rest.community.CommunityService;
import com.waglewagle.rest.keyword.KeywordDTO.*;
import com.waglewagle.rest.keyword.association.AssociationDTO;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api/v1/keyword") //정확한 표현법좀???
@RequiredArgsConstructor
public class KeywordController {

    private final KeywordService keywordService;
    private final CommunityService communityService;

    /**
     * 키워드 생성
     * 11.29
     */
    @ResponseBody
    @PostMapping("")
    public ResponseEntity<CreateKeywordResponse> createKeyword(@RequestBody CreateKeywordInputDTO createKeywordInputDTO, @CookieValue("user_id") Long userId) {

        if (keywordService.isDuplicated(createKeywordInputDTO)) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        String keywordName = createKeywordInputDTO.getKeywordName();
        Long communityId = createKeywordInputDTO.getCommunityId();

        Keyword keyword = keywordService.createKeyword(userId, communityId, keywordName);

        return new ResponseEntity<>(new KeywordDTO.CreateKeywordResponse(keyword), HttpStatus.CREATED);
    }

    //spring controller parameter
    //https://velog.io/@junbee/Spring-MVC-%EA%B8%B0%EB%B3%B8-%EA%B8%B0%EB%8A%A52-%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0-%EC%B2%98%EB%A6%AC
    //ResponseEntity
    //https://velog.io/@alstn_dev/Spring-Boot%EB%A1%9C-REST-API-%EC%84%9C%EB%B2%84-%EB%A7%8C%EB%93%A4%EA%B8%B0
    @ResponseBody
    @GetMapping("/associations")
    public ResponseEntity<List<AssociationDTO>> getAssociatedKeywords(@RequestParam("keyword-id") Long keywordId) {

        List<AssociationDTO> sortedList = keywordService.calcAssociatedKeywordsByKeyword(keywordId);

        //실패 http status? : 애초에 실패상황은 뭘까
        return ResponseEntity.ok(sortedList);
    }

    @ResponseBody
    @GetMapping("/{community_id}")
    public ResponseEntity<List<KeywordDTO>> getAllKeywordInCommunity(@PathVariable("community_id") Long communityId) {

        // TODO: Exception Handler
        // return type이 정해져 있어 에러 메시지를 string이나 객체로 만들 수 없음.
        if (!communityService.isExistCommunity(communityId)) {
            return ResponseEntity.badRequest().build();
        }

        List<KeywordDTO> keywordListInCommunity = keywordService.getKeywordListInCommunity(communityId);

        if (keywordListInCommunity.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(keywordListInCommunity);
    }

    /**
     * 키워드 참가
     * 11.29
     */
    @ResponseBody
    @PostMapping("/join")
    public ResponseEntity<Boolean> joinKeyword(@RequestBody JoinKeywordInputDTO joinKeywordInputDTO, @CookieValue("user_id") Long userId) {
        if (!joinKeywordInputDTO.isValid() || userId == null) {
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        }

        keywordService.joinKeyword(joinKeywordInputDTO, userId);
        return new ResponseEntity(null, HttpStatus.CREATED);
    }
}
