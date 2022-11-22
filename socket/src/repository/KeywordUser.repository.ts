import { EntityManager } from 'typeorm';
import { KeywordUser } from './../entity/KeywordUser';
import dataSource from './data-source';
import RepositoryInterface from './repository.interface';

class KeywordUserRepository implements KeywordUserRepositoryInterface {
  get dataSource() {
    return dataSource;
  }

  get entity() {
    return KeywordUser;
  }

  /**
   * can hand over entityManager as second argument for transaction
   */
  async save(keywordUser: KeywordUser, em?: EntityManager): Promise<KeywordUser> {
    if (!em) {
      return await keywordUser.save();
    }
    return await em.save(keywordUser);
  }

  /**
   * can hand over entityManager as second argument for transaction
   */
  async delete(keywordUser: KeywordUser, em?: EntityManager): Promise<void> {
    if (!em) {
      await this.entity.remove(keywordUser);
      return;
    }
    await em.remove(keywordUser);
    return;
  }

  /**
   * can hand over entityManager as third argument for transaction
   */
  async checkIfKeywordSelected(
    userId: string,
    keywordId: string,
    em?: EntityManager
  ): Promise<boolean> {
    if (!em) {
      const isKeywordSelected = await this.entity.countBy({
        keywordId,
        userId,
      });
      return isKeywordSelected === 1;
    }

    const isKeywordSelected = await em.countBy(this.entity, {
      keywordId,
      userId,
    });
    return isKeywordSelected === 1;
  }
}

export interface KeywordUserRepositoryInterface extends RepositoryInterface {
  save(keywordUser: KeywordUser, em?: EntityManager): Promise<KeywordUser>;
  delete(keywordUser: KeywordUser, em?: EntityManager): Promise<void>;
  checkIfKeywordSelected(userId: string, keywordId: string, em?: EntityManager): Promise<boolean>;
  get entity(): typeof KeywordUser;
}

export default new KeywordUserRepository();
