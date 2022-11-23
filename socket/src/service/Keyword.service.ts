import { Keyword } from './../entity/Keyword';
import KeywordRepository, { KeywordRepositoryInterface } from './../repository/Keyword.repository';

class KeywordService implements KeywordServiceInterface {
  constructor(private readonly keywordRepository: KeywordRepositoryInterface) {}

  async saveKeyword(
    keywordString: string,
    authorId: string,
    communityId: string
  ): Promise<Keyword> {
    return new Promise((resolve, reject) => {
      this.keywordRepository.dataSource.manager.transaction(async (em) => {
        const Keyword = this.keywordRepository.entity;

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

  async checkIfKeywordExist(communityId: string, keywordString: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.keywordRepository.dataSource.transaction(async (em) => {
        this.keywordRepository
          .checkIfKeywordExists(communityId, keywordString, em)
          .then((isExist) => resolve(isExist))
          .catch((error) => reject(error));
      });
    });
  }

  async findKeywordInCommunity(
    communityId: string,
    keywordString: string
  ): Promise<Keyword | null> {
    return new Promise((resolve, reject) => {
      this.keywordRepository.dataSource.transaction(async (em) => {
        this.keywordRepository
          .findByKeywordAndCommunityId(communityId, keywordString, em)
          .then((foundKeyword) => resolve(foundKeyword))
          .catch((error) => reject(error));
      });
    });
  }
}

export interface KeywordServiceInterface {
  saveKeyword(keywordString: string, creatorId: string, communityId: string): Promise<Keyword>;
  checkIfKeywordExist(communityId: string, keywordString: string): Promise<boolean>;
  findKeywordInCommunity(communityId: string, keywordString: string): Promise<Keyword | null>;
}

export default new KeywordService(KeywordRepository);
