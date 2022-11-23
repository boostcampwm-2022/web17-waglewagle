import { ControllerInterface } from './controller.interface';
import { emittingEvent, listeningEvent } from './../utils/event.enum';
import CommunityUserService, {
  CommunityUserServiceInterface,
} from './../service/CommunityUser.service';
import KeywordUserService, { KeywordUserServiceInterface } from './../service/KeywordUser.service';
import keywordService, { KeywordServiceInterface } from '../service/Keyword.service';
import { createFailedResponseTemplate, createSuccessfulResponseTemplate } from '../utils/util';
import {
  AlreadySelectedKeywordError,
  CommunityNotExistingError,
  ForbiddenError,
  IllegalInputError,
  UnauthorizedError,
} from '../utils/error';
import { deselectKeywordInput, selectKeywordInput } from '../utils/event-input.types';
import { SocketWithUserId } from '../types/socket.types';
import CommunityService, { CommunityServiceInterface } from '../service/Community.service';

class KeywordController implements ControllerInterface {
  constructor(
    private readonly keywordService: KeywordServiceInterface,
    private readonly keywordUserService: KeywordUserServiceInterface,
    private readonly communityUserService: CommunityUserServiceInterface,
    private readonly communityService: CommunityServiceInterface
  ) {}

  // 여러 개 키워드 동시 추가 이벤트 추가하기

  // 키워드 선택 및 부재 시 생성
  onSelectKeyword(socket: SocketWithUserId) {
    return async (
      { communityId, keyword: keywordString }: selectKeywordInput,
      errorCallback?: (error: any) => void
    ) => {
      try {
        // 1. 로그인 한 유저인가?
        if (!socket.userId) {
          throw new ForbiddenError();
        }

        // 2. 커뮤니티가 존재하는가?
        if (!(await this.communityService.checkIfCommunityExist(communityId))) {
          throw new CommunityNotExistingError();
        }

        // 3. 커뮤니티에 참가한 유저인가?
        if (!(await this.communityUserService.isUserInCommunity(socket.userId, communityId))) {
          throw new UnauthorizedError();
        }

        // 4. 키워드가 존재하는가?
        //      존재하는 경우 id를 뽑아와야 함.
        let foundKeyword = await this.keywordService.findKeywordInCommunity(
          communityId,
          keywordString
        );
        if (!foundKeyword) {
          foundKeyword = await this.keywordService.saveKeyword(
            keywordString,
            socket.userId,
            communityId
          );
        }

        // 5. 키워드에 이미 참가하였는가?
        if (
          await this.keywordUserService.checkIfKeywordAlreadySelected(
            socket.userId,
            foundKeyword.id
          )
        ) {
          throw new AlreadySelectedKeywordError();
        }

        // 키워드 선택!
        await this.keywordUserService.selectKeyword(socket.userId, foundKeyword.id, communityId);

        // 키워드 이벤트 발생!
        socket.broadcast.emit(emittingEvent.keyword_selected, {
          userId: socket.userId,
          keyword: keywordString,
          keywordId: foundKeyword.id,
        });
      } catch (error) {
        errorCallback && errorCallback(createFailedResponseTemplate(error));
      }
    };
  }

  onDeselectKeyword(socket: SocketWithUserId) {
    return async ({ keywordId, communityId }: deselectKeywordInput) => {
      try {
        if (!(await this.keywordService.checkIfKeywordExist(communityId, keywordId))) {
          throw new IllegalInputError();
        }

        const { userId } = socket.data;
        if (await this.keywordUserService.checkIfKeywordAlreadySelected(userId, keywordId)) {
          throw new IllegalInputError();
        }

        const savedKeywordUser = await this.keywordUserService.selectKeyword(
          userId,
          keywordId,
          communityId
        );

        socket.emit(
          emittingEvent.select_keyword_response,
          createSuccessfulResponseTemplate(savedKeywordUser)
        );
        socket.emit(emittingEvent.keyword_selected, savedKeywordUser);
      } catch (error) {
        // socketCarrier.socket.emit(
        //   emittingEvent.create_keyword_response,
        //   createFailedResponseTemplate(error)
        // );
      }
    };
  }

  register(socket: SocketWithUserId) {
    socket.on(listeningEvent.select_keyword, this.onSelectKeyword(socket));
  }
}

export default new KeywordController(
  keywordService,
  KeywordUserService,
  CommunityUserService,
  CommunityService
);
