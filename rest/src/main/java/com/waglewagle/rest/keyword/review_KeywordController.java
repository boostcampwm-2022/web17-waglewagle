package com.waglewagle.rest.keyword;

import com.waglewagle.rest.community.CommunityService;
import com.waglewagle.rest.keyword.association.AssociationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/api/v1/keyword")
@RequiredArgsConstructor
public class review_KeywordController {

    private final KeywordService keywordService;

    @GetMapping("/associations")
    public ResponseEntity<List<AssociationDTO>> getAssociatedKeywords(@RequestParam("keyword-id") Long keywordId) {

        List<AssociationDTO> sortedList = keywordService.calcAssociatedKeywordsByKeyword(keywordId);

        //실패 http status? : 애초에 실패상황은 뭘까
        return ResponseEntity.ok(sortedList);
    }
}
