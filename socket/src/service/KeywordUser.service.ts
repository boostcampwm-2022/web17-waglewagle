import { KeywordUser } from './../entity/KeywordUser';
import KeywordUserRepository, {
  KeywordUserRepositoryInterface,
} from './../repository/KeywordUser.repository';

class KeywordUserService {
  constructor(private readonly KeywordUserRepository: KeywordUserRepositoryInterface) {}

  async checkIfKeywordAlreadySelected(userId: string, keywordId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.KeywordUserRepository.dataSource.transaction(async (em) => {
        this.KeywordUserRepository.checkIfKeywordSelected(userId, keywordId, em)
          .then((isKeywordSelected) => resolve(isKeywordSelected))
          .catch((error) => reject(error));
      });
    });
  }

  async selectKeyword(
    userId: string,
    keywordId: string,
    communityId: string
  ): Promise<KeywordUser> {
    return new Promise((resolve, reject) => {
      this.KeywordUserRepository.dataSource.transaction(async (em) => {
        const keywordUser = new this.KeywordUserRepository.entity();
        keywordUser.communityId = communityId;
        keywordUser.keywordId = keywordId;
        keywordUser.userId = userId;

        this.KeywordUserRepository.save(keywordUser)
          .then((savedKeywordUser) => resolve(savedKeywordUser))
          .catch((error) => reject(error));
      });
    });
  }
}

export interface KeywordUserServiceInterface {
  checkIfKeywordAlreadySelected(userId: string, keywordId: string): Promise<boolean>;
  selectKeyword(userId: string, keywordId: string, communityId: string): Promise<KeywordUser>;
}

export default new KeywordUserService(KeywordUserRepository);
