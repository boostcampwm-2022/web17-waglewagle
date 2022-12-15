package com.waglewagle.rest.keyword.service;

import com.waglewagle.rest.common.PreResponseDTO;
import com.waglewagle.rest.common.exception.InvalidInputException;
import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.community.exception.NoSuchCommunityException;
import com.waglewagle.rest.community.exception.UnSubscribedCommunityException;
import com.waglewagle.rest.community.repository.CommunityRepository;
import com.waglewagle.rest.community.repository.CommunityUserRepository;
import com.waglewagle.rest.keyword.data_object.KeywordVO;
import com.waglewagle.rest.keyword.data_object.dto.AssociationDTO;
import com.waglewagle.rest.keyword.data_object.dto.request.KeywordRequest;
import com.waglewagle.rest.keyword.data_object.dto.response.KeywordResponse;
import com.waglewagle.rest.keyword.entity.Keyword;
import com.waglewagle.rest.keyword.entity.KeywordUser;
import com.waglewagle.rest.keyword.exception.AlreadyJoinedKeywordException;
import com.waglewagle.rest.keyword.exception.DuplicatedKeywordException;
import com.waglewagle.rest.keyword.exception.NoSuchKeywordException;
import com.waglewagle.rest.keyword.repository.KeywordRepository;
import com.waglewagle.rest.keyword.repository.KeywordUserRepository;
import com.waglewagle.rest.keyword.service.association.AssociationCalculator;
import com.waglewagle.rest.thread.repository.ThreadRepository;
import com.waglewagle.rest.user.entity.User;
import com.waglewagle.rest.user.enums.Role;
import com.waglewagle.rest.user.exception.NoSuchUserException;
import com.waglewagle.rest.user.exception.UnauthorizedException;
import com.waglewagle.rest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
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
    public PreResponseDTO<List<AssociationDTO>>
    calcAssociatedKeywordsByKeyword(final Long baseKeywordId) {

        Keyword baseKeyword = keywordRepository
                .findById(baseKeywordId)
                .orElseThrow(NoSuchElementException::new);
        List<Keyword> associatedKeywords = keywordRepository.findAssociatedKeywords(baseKeyword);

        return new PreResponseDTO<>(
                associationCalculator.getSortedKeywordList(baseKeyword, associatedKeywords),
                HttpStatus.OK);
    }

    //2. 유저기반(유저가 선택한 키워드들에 연관된)
    public List<Keyword>
    calcAssociatedKeywordsByUser(final Long userId) {

        return null;
    }

    @Transactional(readOnly = true)
    public PreResponseDTO<List<KeywordResponse.KeywordMemberCountDTO>>
    getKeywordListInCommunity(final Long communityId)
            throws NoSuchCommunityException {

        communityRepository
                .findById(communityId)
                .orElseThrow(NoSuchCommunityException::new);

        List<KeywordResponse.KeywordMemberCountDTO>
                keywordMemberCountDTOS = keywordRepository
                .findAllByCommunityIdJoinKeywordUser(communityId)
                .stream()
                .map(KeywordResponse.KeywordMemberCountDTO::of)
                .collect(Collectors.toList());

        return new PreResponseDTO(
                keywordMemberCountDTOS,
                keywordMemberCountDTOS.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public boolean
    isDuplicated(final KeywordRequest.CreateDTO createDTO) {

        return keywordRepository
                .findByKeywordNameAndCommunityId(createDTO.getKeywordName(), createDTO.getCommunityId())
                .isPresent();
    }

    @Transactional
    public PreResponseDTO<KeywordResponse.KeywordDTO>
    createKeyword(final Long userId,
                  final Long communityId,
                  final String keywordName)
            throws
            DuplicatedKeywordException,
            NoSuchUserException,
            NoSuchCommunityException {

        keywordRepository
                .findByKeywordNameAndCommunityId(keywordName, communityId)
                .ifPresent((__) -> {
                    System.out.println();
                    throw new DuplicatedKeywordException();
                });


        User user = userRepository
                .findById(userId)
                .orElseThrow(NoSuchUserException::new);
        Community community = communityRepository
                .findById(communityId)
                .orElseThrow(NoSuchCommunityException::new);
        communityUserRepository
                .findOptionalByUserIdAndCommunityId(userId, communityId)
                .orElseThrow(UnSubscribedCommunityException::new);

        KeywordVO.CreateVO createVO = KeywordVO.CreateVO.from(user, community, keywordName);
        Keyword keyword = Keyword.of(createVO);

        KeywordVO.JoinVO joinVO = KeywordVO.JoinVO.from(user, community, keyword);
        KeywordUser keywordUser = KeywordUser.of(joinVO);

        keyword.addKeywordUser(keywordUser);

        Keyword savedKeyword = keywordRepository.save(keyword);


        return new PreResponseDTO<>(
                KeywordResponse.KeywordDTO.of(savedKeyword),
                HttpStatus.CREATED);
    }

    @Transactional
    public void
    joinKeyword(final KeywordRequest.JoinDTO joinDTO,
                final Long userId)
            throws
            InvalidInputException,
            NoSuchKeywordException,
            NoSuchCommunityException,
            NoSuchUserException,
            AlreadyJoinedKeywordException {

        Long keywordId = Optional
                .ofNullable(joinDTO.getKeywordId())
                .orElseThrow(InvalidInputException::new);
        Long communityId = Optional
                .ofNullable(joinDTO.getCommunityId())
                .orElseThrow(InvalidInputException::new);
        Keyword keyword = keywordRepository
                .findById(keywordId)
                .orElseThrow(NoSuchKeywordException::new);
        Community community = communityRepository
                .findById(communityId)
                .orElseThrow(NoSuchCommunityException::new);
        User user = userRepository
                .findById(userId)
                .orElseThrow(NoSuchUserException::new);
        keywordUserRepository
                .findByUserAndCommunityAndKeyword(user, community, keyword)
                .ifPresent((__) -> {
                    throw new AlreadyJoinedKeywordException();
                });

        KeywordVO.JoinVO joinVO = KeywordVO.JoinVO.from(user, community, keyword);

        keyword.addKeywordUser(KeywordUser.of(joinVO));
    }

    @Transactional(readOnly = true)
    public PreResponseDTO<List<KeywordResponse.KeywordDTO>>
    getJoinedKeywords(final Long userId,
                      final Long communityId)
            throws
            UnSubscribedCommunityException {

        communityUserRepository
                .findOptionalByUserIdAndCommunityId(userId, communityId)
                .orElseThrow(UnSubscribedCommunityException::new);

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
                 final Long userId)
            throws
            UnauthorizedException,
            NoSuchUserException {

        userRepository
                .findById(userId)
                .ifPresentOrElse(user -> {
                            if (!Role.ADMIN.equals(user.getRole()))
                                throw new UnauthorizedException();
                        },
                        NoSuchUserException::new
                );

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
                  final Long userId)
            throws
            UnauthorizedException,
            NoSuchUserException {

        userRepository
                .findById(userId)
                .ifPresentOrElse(user -> {
                            if (!Role.ADMIN.equals(user.getRole()))
                                throw new UnauthorizedException();
                        },
                        NoSuchUserException::new
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
}
