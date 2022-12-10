package com.waglewagle.rest.keyword.service;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.community.repository.CommunityRepository;
import com.waglewagle.rest.community.repository.CommunityUserRepository;
import com.waglewagle.rest.keyword.data_object.KeywordVO;
import com.waglewagle.rest.keyword.data_object.dto.AssociationDTO;
import com.waglewagle.rest.keyword.data_object.dto.request.KeywordRequest;
import com.waglewagle.rest.keyword.data_object.dto.response.KeywordResponse;
import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.keyword.entity.KeywordUser;
import com.waglewagle.rest.keyword.repository.KeywordRepository;
import com.waglewagle.rest.keyword.repository.KeywordUserRepository;
import com.waglewagle.rest.keyword.service.association.AssociationCalculator;
import com.waglewagle.rest.thread.repository.ThreadRepository;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.enums.Role;
import com.waglewagle.rest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KeywordService {

    private final KeywordRepository keywordRepository;
    private final KeywordUserRepository keywordUserRepository;
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;
    private final CommunityUserRepository communityUserRepository;
    private final ThreadRepository threadRepository;

    private final AssociationCalculator associationCalculator;

    //1. base키워드(선택된 키워드)기반
    @Transactional(readOnly = true)
    public List<AssociationDTO>
    calcAssociatedKeywordsByKeyword(final Long baseKeywordId) {

        Keyword baseKeyword = keywordRepository
                .findById(baseKeywordId)
                .orElseThrow(NoSuchElementException::new);
        List<Keyword> associatedKeywords = keywordRepository.findAssociatedKeywords(baseKeyword);

        return associationCalculator.getSortedKeywordList(baseKeyword, associatedKeywords);
    }

    //2. 유저기반(유저가 선택한 키워드들에 연관된)
    public List<Keyword>
    calcAssociatedKeywordsByUser(final Long userId) {

        return null;
    }

    @Transactional(readOnly = true)
    public List<KeywordResponse.KeywordMemberCountDTO>
    getKeywordListInCommunity(final Long communityId) {

        return keywordRepository
                .findAllByCommunityIdJoinKeywordUser(communityId)
                .stream()
                .map(KeywordResponse.KeywordMemberCountDTO::of)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public boolean
    isDuplicated(final KeywordRequest.CreateDTO createDTO) {

        return keywordRepository
                .findByKeywordNameAndCommunityId(createDTO.getKeywordName(), createDTO.getCommunityId())
                .isPresent();
    }

    @Transactional
    public Keyword
    createKeyword(final Long userId,
                  final Long communityId,
                  final String keywordName) {

        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        Community community = communityRepository
                .findById(communityId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 커뮤니티입니다."));

        KeywordVO.CreateVO createVO = KeywordVO.CreateVO.from(user, community, keywordName);
        Keyword keyword = Keyword.of(createVO);

        KeywordVO.JoinVO joinVO = KeywordVO.JoinVO.from(user, community, keyword);
        KeywordUser keywordUser = KeywordUser.of(joinVO);

        keyword.addKeywordUser(keywordUser);

        return keywordRepository.save(keyword);
    }

    @Transactional
    public void
    joinKeyword(final KeywordRequest.JoinDTO joinDTO,
                final Long userId) throws IllegalArgumentException {

        Keyword keyword = keywordRepository
                .findById(joinDTO.getKeywordId())
                .orElseThrow(IllegalArgumentException::new);

        Community community = communityRepository
                .findById(joinDTO.getCommunityId())
                .orElseThrow(IllegalArgumentException::new);
        User user = userRepository
                .findById(userId)
                .orElseThrow(IllegalArgumentException::new);
        keywordUserRepository
                .findByUserAndCommunityAndKeyword(user, community, keyword)
                .ifPresent((__) -> {
                    throw new IllegalArgumentException("이미 가입된 키워드입니다.");
                });

        KeywordVO.JoinVO joinVO = KeywordVO.JoinVO.from(user, community, keyword);

        keyword.addKeywordUser(KeywordUser.of(joinVO));
    }

    @Transactional(readOnly = true)
    public PreResponseDTO<List<KeywordResponse.KeywordDTO>>
    getJoinedKeywords(final Long userId,
                      final Long communityId) {

        communityUserRepository
                .findOptionalByUserIdAndCommunityId(userId, communityId)
                .ifPresent(__ -> {
                    throw new IllegalArgumentException();
                });

        List<KeywordResponse.KeywordDTO>
                keywordDTOS = keywordRepository
                .findAllFromKeywordUserByUserIdAndCommunityId(userId, communityId)
                .stream()
                .map(KeywordResponse.KeywordDTO::of)
                .collect(Collectors.toList());

        return new PreResponseDTO<>(
                keywordDTOS,
                keywordDTOS.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK
        );
    }

    @Transactional
    public void
    keywordMerge(final KeywordRequest.MergeDTO mergeDTO,
                 final Long userId) {

        userRepository
                .findById(userId)
                .map(user -> {
                    if (Role.ADMIN.equals(user.getRole()))
                        throw new NoSuchElementException("권한이 없습니다.");
                    return user;
                }).orElseThrow(NoSuchElementException::new);

        //keywordUser.keywordId 수정
        keywordUserRepository
                .updateAllKeywordIdByIdInBulk(
                        mergeDTO.getSourceKeywordIdList(),
                        mergeDTO.getDestinationKeywordId());
        //thread.keywordId 수정
        threadRepository
                .updateAllKeywordIdByIdInBulk(
                        mergeDTO.getSourceKeywordIdList(),
                        mergeDTO.getDestinationKeywordId());
        //keyword 삭제
        keywordRepository
                .deleteAllByIdInBulk(
                        mergeDTO.getSourceKeywordIdList());
    }

    //키워드 삭제(선택한 복수개)
    @Transactional
    public void
    deleteKeyword(final KeywordRequest.DeleteDTO deleteDTO,
                  final Long userId) {

        userRepository
                .findById(userId)
                .ifPresentOrElse(user -> {
                            if (!Role.ADMIN.equals(user.getRole()))
                                throw new NoSuchElementException("권한이 없습니다.");
                        },
                        NoSuchElementException::new
                );

        //thread 삭제
        threadRepository
                .deleteAllChildThreadByKeywordIdInBulk(
                        deleteDTO.getKeywordIdList());
        threadRepository.
                deleteAllParentThreadByKeywordIdInBulk(
                        deleteDTO.getKeywordIdList());
        //keywordUser 삭제
        keywordUserRepository
                .deleteAllByKeywordIdInBulk(
                        deleteDTO.getKeywordIdList());
        //keyword 삭제
        keywordRepository
                .deleteAllByIdInBulk(
                        deleteDTO.getKeywordIdList());
    }

    @Transactional(readOnly = true)
    public boolean
    isKeywordExist(final Long keywordId) {

        return keywordRepository
                .findById(keywordId)
                .isPresent();
    }
}
