import { EntityManager } from 'typeorm';
import { Keyword } from './../entity/Keyword';
import dataSource from './data-source';
import RepositoryInterface from './repository.interface';

class KeywordRepository implements KeywordRepositoryInterface {
  get dataSource() {
    return dataSource;
  }

  get entity() {
    return Keyword;
  }

  /**
   * can hand over entityManager as second argument for transaction
   */
  async save(keyword: Keyword, em?: EntityManager): Promise<Keyword> {
    if (!em) {
      return await keyword.save();
    }
    return await em.save(keyword);
  }

  /**
   * can hand over entityManager as second argument for transaction
   */
  async delete(keyword: Keyword, em?: EntityManager): Promise<void> {
    if (!em) {
      await this.entity.remove(keyword);
      return;
    }
    await em.remove(keyword);
    return;
  }

  /**
   * can hand over entityManager as third argument for transaction
   */
  async checkIfKeywordExists(
    communityId: string,
    keywordId: string,
    em?: EntityManager
  ): Promise<boolean> {
    const Keyword = this.entity;
    if (!em) {
      const isKeywordExist = await Keyword.countBy({ id: keywordId, communityId });
      return isKeywordExist === 1;
    }

    const isKeywordExist = await em.countBy(Keyword, { id: keywordId, communityId });
    return isKeywordExist === 1;
  }
}

export interface KeywordRepositoryInterface extends RepositoryInterface {
  save(keyword: Keyword, em?: EntityManager): Promise<Keyword>;
  delete(keyword: Keyword, em?: EntityManager): Promise<void>;
  checkIfKeywordExists(
    communityId: string,
    keywordId: string,
    em?: EntityManager
  ): Promise<boolean>;
  get entity(): typeof Keyword;
}

export default new KeywordRepository();
