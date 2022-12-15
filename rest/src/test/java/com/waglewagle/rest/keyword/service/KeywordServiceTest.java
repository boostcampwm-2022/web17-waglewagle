package com.waglewagle.rest.keyword.service;

import com.waglewagle.rest.common.exception.InvalidInputException;
import com.waglewagle.rest.community.entity.Community;
import com.waglewagle.rest.community.entity.CommunityUser;
import com.waglewagle.rest.community.exception.NoSuchCommunityException;
import com.waglewagle.rest.community.exception.UnSubscribedCommunityException;
import com.waglewagle.rest.community.repository.CommunityRepository;
import com.waglewagle.rest.community.repository.CommunityUserRepository;
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
import com.waglewagle.rest.user.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class KeywordServiceTest {
    @Mock
    private KeywordRepository keywordRepository;
    @Mock
    private KeywordUserRepository keywordUserRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private CommunityRepository communityRepository;
    @Mock
    private CommunityUserRepository communityUserRepository;
    @Mock
    private ThreadRepository threadRepository;
    @Mock
    private AssociationCalculator associationCalculator;
    @InjectMocks
    private KeywordService keywordService;

    private User admin;
    private User user1;
    private Community community1;
    private Keyword keyword1;
    private Keyword keyword2;
    private KeywordUser keywordUser1;
    private CommunityUser communityUser1;
    private CommunityUser communityUser2;

    @BeforeEach
    void setUp() {
        keywordRepository = mock(KeywordRepository.class);
        keywordUserRepository = mock(KeywordUserRepository.class);
        userRepository = mock(UserRepository.class);
        communityRepository = mock(CommunityRepository.class);
        communityUserRepository = mock(CommunityUserRepository.class);
        threadRepository = mock(ThreadRepository.class);
        associationCalculator = mock(AssociationCalculator.class);
        keywordService = new KeywordService(
                keywordRepository,
                keywordUserRepository,
                userRepository,
                communityRepository,
                communityUserRepository,
                threadRepository,
                associationCalculator);


        admin = mock(User.class);
        when(admin.getId()).thenReturn(1L);
        when(admin.getUsername()).thenReturn("admin username");
        when(admin.getEmail()).thenReturn("mockEMail1@example.com");
        when(admin.getRole()).thenReturn(Role.ADMIN);
        when(userRepository.findById(admin.getId())).thenReturn(Optional.of(admin));

        user1 = mock(User.class);
        when(user1.getId()).thenReturn(2L);
        when(user1.getUsername()).thenReturn("user username");
        when(user1.getEmail()).thenReturn("mockEMailw@example.com");
        when(user1.getProfileImageUrl()).thenReturn("https://loremflickr.com/640/480/abstract");
        when(user1.getRole()).thenReturn(Role.USER);
        when(userRepository.findById(user1.getId())).thenReturn(Optional.of(user1));

        community1 = mock(Community.class);
        when(community1.getId()).thenReturn(1L);
        when(community1.getAdmin()).thenReturn(admin);
        when(community1.getTitle()).thenReturn("mock title");
        when(community1.getSummary()).thenReturn("mock summary");
        when(communityRepository.findById(community1.getId())).thenReturn(Optional.of(community1));

        communityUser1 = mock(CommunityUser.class);
        when(communityUser1.getId()).thenReturn(1L);
        when(communityUser1.getCommunity()).thenReturn(community1);
        when(communityUser1.getUser()).thenReturn(admin);
        when(communityUser1.getIsFirstVisit()).thenReturn(false);


        communityUser2 = mock(CommunityUser.class);
        when(communityUser2.getId()).thenReturn(2L);
        when(communityUser2.getCommunity()).thenReturn(community1);
        when(communityUser2.getUser()).thenReturn(user1);
        when(communityUser2.getIsFirstVisit()).thenReturn(false);

        when(userRepository.findById(3L)).thenReturn(Optional.empty());

    }


    @Test
    void getKeywordListInCommunity() {
    }

    @Test
    void isDuplicated() {
    }

    @Test
    @DisplayName("키워드 생성 #1 - 성공 케이스")
    void createKeyword1() {
        // given
        keywordUser1 = mock(KeywordUser.class);
        when(keywordUser1.getKeyword()).thenReturn(keyword1);
        when(keywordUser1.getUser()).thenReturn(admin);
        when(keywordUser1.getCommunity()).thenReturn(community1);

        String testKeyword = "keyword test";
        Keyword savedKeyword = mock(Keyword.class);
        when(savedKeyword.getId()).thenReturn(1L);
        when(savedKeyword.getAuthor()).thenReturn(admin);
        when(savedKeyword.getCommunity()).thenReturn(community1);
        when(savedKeyword.getKeyword()).thenReturn(testKeyword);
        when(savedKeyword.getKeywordUsers()).thenReturn(Stream.of(keywordUser1).collect(Collectors.toList()));

        when(keywordRepository.findByKeywordNameAndCommunityId(testKeyword, community1.getId()))
                .thenReturn(Optional.empty());
        when(userRepository
                .findById(admin.getId()))
                .thenReturn(Optional.ofNullable(admin));
        when(communityRepository
                .findById(community1.getId()))
                .thenReturn(Optional.ofNullable(community1));
        when(communityUserRepository
                .findOptionalByUserIdAndCommunityId(admin.getId(), community1.getId()))
                .thenReturn(Optional.ofNullable(communityUser1));

        when(keywordRepository.save(any(Keyword.class))).thenReturn(savedKeyword);

        // when
        KeywordResponse.KeywordDTO
                keywordDTO = keywordService
                .createKeyword(admin.getId(), community1.getId(), testKeyword)
                .getData();

        // then
        assertThat(keywordDTO.getKeywordId()).isEqualTo(savedKeyword.getId().toString());
        assertThat(keywordDTO.getKeywordName()).isEqualTo(savedKeyword.getKeyword());
    }

    @Test
    @DisplayName("키워드 생성 #2-1 - 중복 키워드")
    void createKeyword2_1() {
        // given
        keyword1 = mock(Keyword.class);
        when(keyword1.getId()).thenReturn(1L);
        when(keyword1.getKeyword()).thenReturn("test keyword1");
        when(keyword1.getAuthor()).thenReturn(admin);
        when(keyword1.getCommunity()).thenReturn(community1);
        when(keywordRepository.save(keyword1)).thenReturn(keyword1);
        when(keywordRepository.findById(1L)).thenReturn(Optional.ofNullable(keyword1));

        keyword2 = mock(Keyword.class);
        when(keyword1.getId()).thenReturn(2L);
        when(keyword1.getKeyword()).thenReturn("test keyword2");
        when(keyword1.getAuthor()).thenReturn(user1);
        when(keyword1.getCommunity()).thenReturn(community1);
        when(keywordRepository.save(keyword2)).thenReturn(keyword2);
        when(keywordRepository.findById(2L)).thenReturn(Optional.ofNullable(keyword2));

        when(keywordRepository.findById(3L)).thenReturn(Optional.empty());

        // when
        when(keywordRepository
                .findByKeywordNameAndCommunityId(
                        keyword1.getKeyword(),
                        keyword1.getCommunity().getId()))
                .thenReturn(Optional.ofNullable(keyword1));
        when(userRepository
                .findById(keyword1.getAuthor().getId()))
                .thenReturn(Optional.ofNullable(admin));
        when(communityRepository
                .findById(keyword1.getCommunity().getId()))
                .thenReturn(Optional.ofNullable(community1));
        when(communityUserRepository
                .findOptionalByUserIdAndCommunityId(
                        keyword1.getAuthor().getId(),
                        keyword1.getCommunity().getId()))
                .thenReturn(Optional.ofNullable(communityUser1));

        // then
        Assertions.assertThrows(DuplicatedKeywordException.class, () -> {
            keywordService.createKeyword(
                    keyword1.getAuthor().getId(),
                    keyword1.getCommunity().getId(), keyword1.getKeyword());
        });
    }

    @Test
    @DisplayName("키워드 생성 #2-2 - 없는 유저")
    void createKeyword2_2() {
        // given
        keyword1 = mock(Keyword.class);
        when(keyword1.getId()).thenReturn(1L);
        when(keyword1.getKeyword()).thenReturn("test keyword1");
        when(keyword1.getAuthor()).thenReturn(admin);
        when(keyword1.getCommunity()).thenReturn(community1);
        when(keywordRepository.save(keyword1)).thenReturn(keyword1);
        when(keywordRepository.findById(1L)).thenReturn(Optional.ofNullable(keyword1));

        keyword2 = mock(Keyword.class);
        when(keyword1.getId()).thenReturn(2L);
        when(keyword1.getKeyword()).thenReturn("test keyword2");
        when(keyword1.getAuthor()).thenReturn(user1);
        when(keyword1.getCommunity()).thenReturn(community1);
        when(keywordRepository.save(keyword2)).thenReturn(keyword2);
        when(keywordRepository.findById(2L)).thenReturn(Optional.ofNullable(keyword2));

        when(keywordRepository.findById(3L)).thenReturn(Optional.empty());

        // when
        when(keywordRepository
                .findByKeywordNameAndCommunityId(
                        keyword1.getKeyword(),
                        community1.getId()))
                .thenReturn(Optional.empty());
        when(userRepository
                .findById(admin.getId()))
                .thenReturn(Optional.empty());
        when(communityRepository
                .findById(community1.getId()))
                .thenReturn(Optional.ofNullable(community1));
        when(communityUserRepository
                .findOptionalByUserIdAndCommunityId(
                        admin.getId(),
                        community1.getId()))
                .thenReturn(Optional.ofNullable(communityUser1));

        // then
        Assertions.assertThrows(NoSuchUserException.class, () -> {
            keywordService
                    .createKeyword(
                            admin.getId(),
                            community1.getId(),
                            keyword1.getKeyword());
        });
    }

    @Test
    @DisplayName("키워드 생성 #2-3 - 없는 커뮤니티")
    void createKeyword2_3() {
        // given
        keyword1 = mock(Keyword.class);
        when(keyword1.getId()).thenReturn(1L);
        when(keyword1.getKeyword()).thenReturn("test keyword1");
        when(keyword1.getAuthor()).thenReturn(admin);
        when(keyword1.getCommunity()).thenReturn(community1);
        when(keywordRepository.save(keyword1)).thenReturn(keyword1);
        when(keywordRepository.findById(1L)).thenReturn(Optional.ofNullable(keyword1));

        keyword2 = mock(Keyword.class);
        when(keyword1.getId()).thenReturn(2L);
        when(keyword1.getKeyword()).thenReturn("test keyword2");
        when(keyword1.getAuthor()).thenReturn(user1);
        when(keyword1.getCommunity()).thenReturn(community1);
        when(keywordRepository.save(keyword2)).thenReturn(keyword2);
        when(keywordRepository.findById(2L)).thenReturn(Optional.ofNullable(keyword2));

        when(keywordRepository.findById(3L)).thenReturn(Optional.empty());

        // when
        when(keywordRepository
                .findByKeywordNameAndCommunityId(
                        keyword1.getKeyword(),
                        community1.getId()))
                .thenReturn(Optional.empty());
        when(userRepository
                .findById(admin.getId()))
                .thenReturn(Optional.ofNullable(admin));
        when(communityRepository
                .findById(community1.getId()))
                .thenReturn(Optional.empty());
        when(communityUserRepository
                .findOptionalByUserIdAndCommunityId(
                        admin.getId(),
                        community1.getId()))
                .thenReturn(Optional.ofNullable(communityUser1));

        // then
        Assertions.assertThrows(NoSuchCommunityException.class, () -> {
            keywordService
                    .createKeyword(
                            keyword1.getAuthor().getId(),
                            keyword1.getCommunity().getId(),
                            keyword1.getKeyword());
        });
    }

    @Test
    @DisplayName("키워드 생성 #2-4 - 가입하지 않은 커뮤니티")
    void createKeyword2_4() {
        // given
        keyword1 = mock(Keyword.class);
        when(keyword1.getId()).thenReturn(1L);
        when(keyword1.getKeyword()).thenReturn("test keyword1");
        when(keyword1.getAuthor()).thenReturn(admin);
        when(keyword1.getCommunity()).thenReturn(community1);
        when(keywordRepository.save(keyword1)).thenReturn(keyword1);
        when(keywordRepository.findById(1L)).thenReturn(Optional.ofNullable(keyword1));

        keyword2 = mock(Keyword.class);
        when(keyword1.getId()).thenReturn(2L);
        when(keyword1.getKeyword()).thenReturn("test keyword2");
        when(keyword1.getAuthor()).thenReturn(user1);
        when(keyword1.getCommunity()).thenReturn(community1);
        when(keywordRepository.save(keyword2)).thenReturn(keyword2);
        when(keywordRepository.findById(2L)).thenReturn(Optional.ofNullable(keyword2));

        when(keywordRepository.findById(3L)).thenReturn(Optional.empty());

        // when
        when(keywordRepository
                .findByKeywordNameAndCommunityId(
                        keyword1.getKeyword(),
                        community1.getId()))
                .thenReturn(Optional.empty());
        when(userRepository
                .findById(keyword1.getId()))
                .thenReturn(Optional.ofNullable(admin));
        when(communityRepository
                .findById(community1.getId()))
                .thenReturn(Optional.ofNullable(community1));
        when(communityUserRepository
                .findOptionalByUserIdAndCommunityId(
                        admin.getId(),
                        community1.getId()))
                .thenReturn(Optional.empty());

        // then
        Assertions.assertThrows(UnSubscribedCommunityException.class, () -> {
            keywordService
                    .createKeyword(
                            keyword1.getAuthor().getId(),
                            keyword1.getCommunity().getId(),
                            keyword1.getKeyword());
        });
    }

    @Test
    @DisplayName("키워드 가입 #1 - 성공 케이스")
    void joinKeyword1() {
        // given
        keyword1 = mock(Keyword.class);
        List<KeywordUser> keywordUsers = new ArrayList<>();
        when(keyword1.getId()).thenReturn(1L);
        when(keyword1.getKeyword()).thenReturn("test keyword1");
        when(keyword1.getAuthor()).thenReturn(admin);
        when(keyword1.getCommunity()).thenReturn(community1);

        doCallRealMethod().when(keyword1).addKeywordUser(any(KeywordUser.class));

        ReflectionTestUtils.setField(keyword1, "keywordUsers", keywordUsers);

        when(keywordRepository.save(keyword1)).thenReturn(keyword1);
        when(keywordRepository.findById(1L)).thenReturn(Optional.ofNullable(keyword1));

        keywordUser1 = mock(KeywordUser.class);
        when(keywordUser1.getUser()).thenReturn(user1);
        when(keywordUser1.getKeyword()).thenReturn(keyword1);
        when(keywordUser1.getCommunity()).thenReturn(community1);


        when(keywordRepository.findById(keyword1.getId()))
                .thenReturn(Optional.ofNullable(keyword1));
        when(keywordUserRepository.findByUserAndCommunityAndKeyword(user1, community1, keyword1))
                .thenReturn(Optional.empty());

        KeywordRequest.JoinDTO joinDTO = mock(KeywordRequest.JoinDTO.class);
        when(joinDTO.getCommunityId()).thenReturn(1L);
        when(joinDTO.getKeywordId()).thenReturn(1L);


        // when
        keywordService.joinKeyword(joinDTO, user1.getId());

        // then
        assertThat(keywordUsers.size()).isEqualTo(1);
        assertThat(keywordUsers.get(0).getKeyword().getKeyword()).isEqualTo(keyword1.getKeyword());
        assertThat(keywordUsers.get(0).getUser().getId()).isEqualTo(user1.getId());
        assertThat(keywordUsers.get(0).getCommunity().getId()).isEqualTo(community1.getId());
    }

    @Test
    @DisplayName("키워드 가입 #2-1 - 없는 키워드")
    void joinKeyword2_1() {
        // given
        keyword1 = mock(Keyword.class);
        List<KeywordUser> keywordUsers = new ArrayList<>();
        when(keyword1.getId()).thenReturn(1L);
        when(keyword1.getKeyword()).thenReturn("test keyword1");
        when(keyword1.getAuthor()).thenReturn(admin);
        when(keyword1.getCommunity()).thenReturn(community1);

        doCallRealMethod().when(keyword1).addKeywordUser(any(KeywordUser.class));

        ReflectionTestUtils.setField(keyword1, "keywordUsers", keywordUsers);

        when(keywordRepository.save(keyword1)).thenReturn(keyword1);
        when(keywordRepository.findById(1L)).thenReturn(Optional.ofNullable(keyword1));

        keywordUser1 = mock(KeywordUser.class);
        when(keywordUser1.getUser()).thenReturn(user1);
        when(keywordUser1.getKeyword()).thenReturn(keyword1);
        when(keywordUser1.getCommunity()).thenReturn(community1);


        when(keywordRepository.findById(keyword1.getId()))
                .thenReturn(Optional.empty());

        KeywordRequest.JoinDTO joinDTO = mock(KeywordRequest.JoinDTO.class);
        when(joinDTO.getCommunityId()).thenReturn(1L);
        when(joinDTO.getKeywordId()).thenReturn(1L);


        // when
        Assertions.assertThrows(NoSuchKeywordException.class, () -> {
            keywordService.joinKeyword(joinDTO, user1.getId());
        });
    }

    @Test
    @DisplayName("키워드 가입 #2-2 - 없는 커뮤니티")
    void joinKeyword2_2() {
        // given
        keyword1 = mock(Keyword.class);
        List<KeywordUser> keywordUsers = new ArrayList<>();
        when(keyword1.getId()).thenReturn(1L);
        when(keyword1.getKeyword()).thenReturn("test keyword1");
        when(keyword1.getAuthor()).thenReturn(admin);
        when(keyword1.getCommunity()).thenReturn(community1);

        doCallRealMethod().when(keyword1).addKeywordUser(any(KeywordUser.class));

        ReflectionTestUtils.setField(keyword1, "keywordUsers", keywordUsers);

        when(keywordRepository.save(keyword1)).thenReturn(keyword1);
        when(keywordRepository.findById(1L)).thenReturn(Optional.ofNullable(keyword1));

        keywordUser1 = mock(KeywordUser.class);
        when(keywordUser1.getUser()).thenReturn(user1);
        when(keywordUser1.getKeyword()).thenReturn(keyword1);
        when(keywordUser1.getCommunity()).thenReturn(community1);


        when(keywordRepository.findById(keyword1.getId()))
                .thenReturn(Optional.ofNullable(keyword1));
        when(communityRepository.findById(community1.getId()))
                .thenReturn(Optional.empty());
        when(keywordUserRepository.findByUserAndCommunityAndKeyword(user1, community1, keyword1))
                .thenReturn(Optional.empty());

        KeywordRequest.JoinDTO joinDTO = mock(KeywordRequest.JoinDTO.class);
        when(joinDTO.getCommunityId()).thenReturn(1L);
        when(joinDTO.getKeywordId()).thenReturn(1L);


        // when
        Assertions.assertThrows(NoSuchCommunityException.class
                , () -> {
                    keywordService.joinKeyword(joinDTO, user1.getId());
                }
        );
    }

    @Test
    @DisplayName("키워드 가입 #2-3 - 없는 유저")
    void joinKeyword2_3() {
        // given
        keyword1 = mock(Keyword.class);
        List<KeywordUser> keywordUsers = new ArrayList<>();
        when(keyword1.getId()).thenReturn(1L);
        when(keyword1.getKeyword()).thenReturn("test keyword1");
        when(keyword1.getAuthor()).thenReturn(admin);
        when(keyword1.getCommunity()).thenReturn(community1);

        doCallRealMethod().when(keyword1).addKeywordUser(any(KeywordUser.class));

        ReflectionTestUtils.setField(keyword1, "keywordUsers", keywordUsers);

        when(keywordRepository.save(keyword1)).thenReturn(keyword1);
        when(keywordRepository.findById(1L)).thenReturn(Optional.ofNullable(keyword1));

        keywordUser1 = mock(KeywordUser.class);
        when(keywordUser1.getUser()).thenReturn(user1);
        when(keywordUser1.getKeyword()).thenReturn(keyword1);
        when(keywordUser1.getCommunity()).thenReturn(community1);


        when(keywordRepository.findById(keyword1.getId()))
                .thenReturn(Optional.ofNullable(keyword1));
        when(userRepository.findById(user1.getId()))
                .thenReturn(Optional.empty());
        when(keywordUserRepository.findByUserAndCommunityAndKeyword(user1, community1, keyword1))
                .thenReturn(Optional.empty());

        KeywordRequest.JoinDTO joinDTO = mock(KeywordRequest.JoinDTO.class);
        when(joinDTO.getCommunityId()).thenReturn(1L);
        when(joinDTO.getKeywordId()).thenReturn(1L);


        // when
        Assertions.assertThrows(NoSuchUserException.class
                , () -> {
                    keywordService.joinKeyword(joinDTO, user1.getId());
                }
        );
    }

    @Test
    @DisplayName("키워드 가입 #2-4 - 이미 가입한 키워드")
    void joinKeyword2_4() {
        // given
        keyword1 = mock(Keyword.class);
        List<KeywordUser> keywordUsers = new ArrayList<>();
        when(keyword1.getId()).thenReturn(1L);
        when(keyword1.getKeyword()).thenReturn("test keyword1");
        when(keyword1.getAuthor()).thenReturn(admin);
        when(keyword1.getCommunity()).thenReturn(community1);

        doCallRealMethod().when(keyword1).addKeywordUser(any(KeywordUser.class));

        ReflectionTestUtils.setField(keyword1, "keywordUsers", keywordUsers);

        when(keywordRepository.save(keyword1)).thenReturn(keyword1);
        when(keywordRepository.findById(1L)).thenReturn(Optional.ofNullable(keyword1));

        keywordUser1 = mock(KeywordUser.class);
        when(keywordUser1.getUser()).thenReturn(user1);
        when(keywordUser1.getKeyword()).thenReturn(keyword1);
        when(keywordUser1.getCommunity()).thenReturn(community1);


        when(keywordRepository.findById(keyword1.getId()))
                .thenReturn(Optional.ofNullable(keyword1));
        when(keywordUserRepository.findByUserAndCommunityAndKeyword(user1, community1, keyword1))
                .thenReturn(Optional.of(mock(KeywordUser.class)));

        KeywordRequest.JoinDTO joinDTO = mock(KeywordRequest.JoinDTO.class);
        when(joinDTO.getCommunityId()).thenReturn(1L);
        when(joinDTO.getKeywordId()).thenReturn(1L);


        // when
        Assertions.assertThrows(AlreadyJoinedKeywordException.class
                , () -> {
                    keywordService.joinKeyword(joinDTO, user1.getId());
                }
        );
    }

    @Test
    @DisplayName("키워드 가입 #2-5 - 잘못된 입력")
    void joinKeyword2_5() {
        // given
        keyword1 = mock(Keyword.class);
        List<KeywordUser> keywordUsers = new ArrayList<>();
        when(keyword1.getId()).thenReturn(1L);
        when(keyword1.getKeyword()).thenReturn("test keyword1");
        when(keyword1.getAuthor()).thenReturn(admin);
        when(keyword1.getCommunity()).thenReturn(community1);

        doCallRealMethod().when(keyword1).addKeywordUser(any(KeywordUser.class));

        ReflectionTestUtils.setField(keyword1, "keywordUsers", keywordUsers);

        when(keywordRepository.save(keyword1)).thenReturn(keyword1);
        when(keywordRepository.findById(1L)).thenReturn(Optional.ofNullable(keyword1));

        keywordUser1 = mock(KeywordUser.class);
        when(keywordUser1.getUser()).thenReturn(user1);
        when(keywordUser1.getKeyword()).thenReturn(keyword1);
        when(keywordUser1.getCommunity()).thenReturn(community1);


        when(keywordRepository.findById(keyword1.getId()))
                .thenReturn(Optional.ofNullable(keyword1));
        when(keywordUserRepository.findByUserAndCommunityAndKeyword(user1, community1, keyword1))
                .thenReturn(Optional.of(mock(KeywordUser.class)));

        KeywordRequest.JoinDTO joinDTO1 = mock(KeywordRequest.JoinDTO.class);
        when(joinDTO1.getCommunityId()).thenReturn(null);
        when(joinDTO1.getKeywordId()).thenReturn(1L);
        KeywordRequest.JoinDTO joinDTO2 = mock(KeywordRequest.JoinDTO.class);
        when(joinDTO2.getCommunityId()).thenReturn(1L);
        when(joinDTO2.getKeywordId()).thenReturn(null);
        KeywordRequest.JoinDTO joinDTO3 = mock(KeywordRequest.JoinDTO.class);
        when(joinDTO3.getCommunityId()).thenReturn(null);
        when(joinDTO3.getKeywordId()).thenReturn(null);


        // when
        Assertions.assertThrows(InvalidInputException.class
                , () -> {
                    keywordService.joinKeyword(joinDTO1, user1.getId());
                }
        );
        Assertions.assertThrows(InvalidInputException.class
                , () -> {
                    keywordService.joinKeyword(joinDTO2, user1.getId());
                }
        );
        Assertions.assertThrows(InvalidInputException.class
                , () -> {
                    keywordService.joinKeyword(joinDTO3, user1.getId());
                }
        );
    }

    @Test
    void getJoinedKeywords() {

    }

    @Test
    void keywordMerge() {
    }

    @Test
    void deleteKeyword() {
    }


    @Test
    void calcAssociatedKeywordsByKeyword() {
    }

    @Test
    void calcAssociatedKeywordsByUser() {
    }
}