import { KeywordUser } from './../entity/KeywordUser';
import KeywordUserRepository, { KeywordUserRepositoryInterface } from './../repository/KeywordUser.repository';

class KeywordUserService {
  constructor(private readonly KeywordUserRepository: KeywordUserRepositoryInterface) {}

  checkIfKeywordSelected(userId: string, keywordId: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      this.KeywordUserRepository.dataSource.transaction(async (em) => {
        this.KeywordUserRepository.checkIfKeywordSelected(userId, keywordId, em)
          .then((isKeywordSelected) => resolve(isKeywordSelected))
          .catch((error) => reject(error));
      });
    });
  }

  selectKeyword(userId: string, keywordId: string, communityId: string): Promise<KeywordUser> {
    return new Promise(async (resolve, reject) => {
      this.KeywordUserRepository.dataSource.transaction(async (em) => {
        const keywordUser = new this.KeywordUserRepository.entity();
        keywordUser.communityId = communityId;
        keywordUser.keywordId = keywordId;
        keywordUser.userId = userId;

        this.KeywordUserRepository.save(keywordUser, em)
          .then((savedKeywordUser) => resolve(savedKeywordUser))
          .catch((error) => reject(error));
      });
    });
  }

  deselectKeyword(userId: string, keywordId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.KeywordUserRepository.dataSource.transaction(async (em) => {
        this.KeywordUserRepository.deleteByKeywordIdAndUserId(userId, keywordId, em)
          .then(() => resolve())
          .catch((error) => reject(error));
      });
    });
  }
}

export interface KeywordUserServiceInterface {
  checkIfKeywordSelected(userId: string, keywordId: string): Promise<boolean>;
  selectKeyword(userId: string, keywordId: string, communityId: string): Promise<KeywordUser>;
  deselectKeyword(userId: string, keywordId: string): Promise<void>;
}

export default new KeywordUserService(KeywordUserRepository);
