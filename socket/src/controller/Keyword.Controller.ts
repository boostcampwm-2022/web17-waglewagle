import { ControllerInterface } from './controller.interface';
import KeywordUserService, { KeywordUserServiceInterface } from './../service/KeywordUser.service';
import { emittingEvent } from './../utils/event.enum';
import { KeywordServiceInterface } from './../service/Keyword.service';
import keywordService from '../service/Keyword.service';
import {
  createFailedResponseTemplate,
  createSuccessfulResponseTemplate,
  SocketCarrier,
} from '../utils/util';
import { listeningEvent } from '../utils/event.enum';
import { IllegalInputError } from '../utils/error';

class KeywordController implements ControllerInterface {
  constructor(
    private readonly keywordService: KeywordServiceInterface,
    private readonly keywordUserService: KeywordUserServiceInterface
  ) {}

  onCreateKeyword(socketCarrier: SocketCarrier) {
    return async ({
      communityId,
      keyword: keywordString,
    }: {
      communityId: string;
      keyword: string;
    }): Promise<void> => {
      if (typeof communityId !== 'string' || typeof keywordString !== 'string') {
        socketCarrier.socket.emit(
          emittingEvent.create_keyword_response,
          createFailedResponseTemplate(new IllegalInputError())
        );
        return;
      }
      try {
        const savedKeyword = await this.keywordService.saveKeyword(
          keywordString,
          socketCarrier.userId,
          communityId
        );

        socketCarrier.socket.emit(
          emittingEvent.create_keyword_response,
          createSuccessfulResponseTemplate(savedKeyword)
        );
        socketCarrier.socket.emit(emittingEvent.keyword_created, savedKeyword);
      } catch (error) {
        socketCarrier.socket.emit(
          emittingEvent.create_keyword_response,
          createFailedResponseTemplate(error)
        );
      }
    };
  }

  onSelectKeyword(socketCarrier: SocketCarrier) {
    return async ({ keywordId, communityId }: { keywordId: string; communityId: string }) => {
      try {
        if (!(await this.keywordService.checkIfKeywordExist(communityId, keywordId))) {
          throw new IllegalInputError();
        }

        const userId = socketCarrier.userId;
        if (await this.keywordUserService.checkIfKeywordAlreadySelected(userId, keywordId)) {
          throw new IllegalInputError();
        }

        const savedKeywordUser = await this.keywordUserService.selectKeyword(
          userId,
          keywordId,
          communityId
        );

        socketCarrier.socket.emit(
          emittingEvent.select_keyword_response,
          createSuccessfulResponseTemplate(savedKeywordUser)
        );
        socketCarrier.socket.emit(emittingEvent.keyword_selected, savedKeywordUser);
      } catch (error) {
        socketCarrier.socket.emit(
          emittingEvent.create_keyword_response,
          createFailedResponseTemplate(error)
        );
      }
    };
  }

  register(socketCarrier: SocketCarrier) {
    socketCarrier.socket.on(listeningEvent.create_keyword, this.onCreateKeyword(socketCarrier));
    socketCarrier.socket.on(listeningEvent.select_keyword, this.onSelectKeyword(socketCarrier));
  }
}

export default new KeywordController(keywordService, KeywordUserService);
