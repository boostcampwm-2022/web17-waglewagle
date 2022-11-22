import CommunityUserRepository, {
  CommunityUserRepositoryInterface,
} from './../repository/CommunityUser.repository';
import { DuplicatedKeywordError } from '../utils/error';
import { Keyword } from './../entity/Keyword';
import KeywordRepository, { KeywordRepositoryInterface } from './../repository/Keyword.repository';
import KeywordUserRepository, {
  KeywordUserRepositoryInterface,
} from '../repository/KeywordUser.repository';

class KeywordService implements KeywordServiceInterface {
  constructor(
    private readonly keywordRepository: KeywordRepositoryInterface,
    private readonly communityUserRepository: CommunityUserRepositoryInterface,
    private readonly keywordUserRepository: KeywordUserRepositoryInterface
  ) {}

  async saveKeyword(
    keywordString: string,
    authorId: string,
    communityId: string
  ): Promise<Keyword> {
    return new Promise((resolve, reject) => {
      this.keywordRepository.dataSource.manager.transaction(async (em) => {
        const Keyword = this.keywordRepository.entity;

        const isAlreadyExistingKeyword =
          (await em.countBy(Keyword, {
            authorId,
            keyword: keywordString,
            communityId,
          })) === 1;
        if (isAlreadyExistingKeyword) {
          return reject(new DuplicatedKeywordError());
        }

        const newKeyword = new Keyword();
        newKeyword.keyword = keywordString;
        newKeyword.authorId = authorId;
        newKeyword.communityId = communityId;

        this.keywordRepository
          .save(newKeyword, em)
          .then((keyword) => resolve(keyword))
          .catch((error) => reject(error));
      });
    });
  }

  async checkIfKeywordExist(communityId: string, keywordId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.keywordRepository.dataSource.transaction(async (em) => {
        this.keywordRepository
          .checkIfKeywordExists(communityId, keywordId, em)
          .then((isExist) => resolve(isExist))
          .catch((error) => reject(error));
      });
    });
  }

  async checkIfKeywordAlreadySelected(userId: string, keywordId: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.keywordUserRepository.dataSource.transaction(async (em) => {});
    });
  }

  async selectKeyword(userId: string, keywordId: string, communityId: string): Promise<void> {
    // 1. 유저가 커뮤니티에 속해있는지?
    // 2. 존재하는 키워드인지?
    // 3. 유저가 이미 선택한 키워드가 아닌지?
  }

  async deselectKeyword(keywordId: string, userId: string): Promise<void> {}

  async deleteKeyword(keywordId: string, userId: string): Promise<void> {}
}

export interface KeywordServiceInterface {
  saveKeyword(keywordString: string, creatorId: string, communityId: string): Promise<Keyword>;
  checkIfKeywordExist(communityId: string, keywordId: string): Promise<boolean>;
  checkIfKeywordAlreadySelected(userId: string, keywordId: string): Promise<boolean>;
}

export default new KeywordService(
  KeywordRepository,
  CommunityUserRepository,
  KeywordUserRepository
);
