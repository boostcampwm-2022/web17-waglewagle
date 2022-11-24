import { ControllerInterface } from './controller.interface';
import { emittingEvent, listeningEvent } from './../utils/event.enum';
import CommunityUserService, { CommunityUserServiceInterface } from './../service/CommunityUser.service';
import KeywordUserService, { KeywordUserServiceInterface } from './../service/KeywordUser.service';
import keywordService, { KeywordServiceInterface } from '../service/Keyword.service';
import { createFailedResponseTemplate } from '../utils/util';
import {
  AlreadySelectedKeywordError,
  CommunityNotExistingError,
  ForbiddenError,
  KeywordNotExistingError,
  KeywordNotSelectedError,
  UnauthorizedError,
} from '../utils/error';
import { deleteKeywordInput, deselectKeywordInput, selectKeywordInput } from '../utils/event-input.types';
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
  onSelectKeyword(socket: SocketWithUserId): (input: selectKeywordInput, callback?: (error: any) => void) => void {
    return async (
      { communityId, keyword: keywordString }: selectKeywordInput,
      errorCallback?: (error: any) => void
    ) => {
      try {
        // 1. 로그인 한 유저인가?
        if (!socket.userId) {
          throw new ForbiddenError();
        }
        const userId = socket.userId;

        // 2. 커뮤니티가 존재하는가?
        if (!(await this.communityService.isCommunityExist(communityId))) {
          throw new CommunityNotExistingError();
        }

        // 3. 커뮤니티에 참가한 유저인가?
        if (!(await this.communityUserService.isUserInCommunity(userId, communityId))) {
          throw new UnauthorizedError();
        }

        // 4. 키워드가 존재하는가?
        //      존재하는 경우 id를 뽑아와야 함.
        let foundKeyword = await this.keywordService.findKeywordInCommunityWithKeywordString(
          communityId,
          keywordString
        );
        if (!foundKeyword) {
          foundKeyword = await this.keywordService.saveKeyword(keywordString, userId, communityId);
        }

        // 5. 키워드에 이미 참가하였는가?
        if (await this.keywordUserService.isKeywordSelected(userId, foundKeyword.id)) {
          throw new AlreadySelectedKeywordError();
        }

        // 키워드 선택!
        await this.keywordUserService.selectKeyword(userId, foundKeyword.id, communityId);

        // 키워드 이벤트 발생!
        socket.broadcast.emit(emittingEvent.keyword_selected, {
          userId,
          keyword: keywordString,
          keywordId: foundKeyword.id,
        });
      } catch (error) {
        errorCallback && errorCallback(createFailedResponseTemplate(error));
      }
    };
  }

  onDeselectKeyword(socket: SocketWithUserId): (input: deselectKeywordInput, callback?: (error: any) => void) => void {
    return async ({ keywordId, communityId }: deselectKeywordInput, errorCallback?: (error: any) => void) => {
      try {
        // 1. 로그인 한 유저인가?
        if (!socket.userId) {
          throw new ForbiddenError();
        }
        const userId = socket.userId;

        // 2. 커뮤니티가 존재하는가?
        if (!(await this.communityService.isCommunityExist(communityId))) {
          throw new CommunityNotExistingError();
        }

        // 3. 커뮤니티에 참가한 유저인가?
        if (!(await this.communityUserService.isUserInCommunity(userId, communityId))) {
          throw new UnauthorizedError();
        }

        // 4. 키워드가 존재하는가?
        if (!(await this.keywordService.isKeywordIdExistsInCommunity(communityId, keywordId))) {
          throw new KeywordNotExistingError();
        }

        // 5. 키워드에 참가하였는가?
        if (!(await this.keywordUserService.isKeywordSelected(userId, keywordId))) {
          throw new KeywordNotSelectedError();
        }

        // 키워드 선택 취소!
        await this.keywordUserService.deselectKeyword(userId, keywordId);

        // 키워드 이벤트 발생!
        socket.broadcast.emit(emittingEvent.keyword_deselected, {
          userId,
          keywordId,
          communityId,
        });
      } catch (error) {
        errorCallback && errorCallback(createFailedResponseTemplate(error));
      }
    };
  }

  register(socket: SocketWithUserId) {
    socket.on(listeningEvent.select_keyword, this.onSelectKeyword(socket));
    socket.on(listeningEvent.deselect_keyword, this.onDeselectKeyword(socket));
  }
}

export { KeywordController };
export default new KeywordController(keywordService, KeywordUserService, CommunityUserService, CommunityService);
