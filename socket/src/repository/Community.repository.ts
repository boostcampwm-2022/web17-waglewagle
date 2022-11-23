import { EntityManager } from 'typeorm';
import { Community } from './../entity/Community';
import dataSource from './data-source';
import RepositoryInterface from './repository.interface';

class CommunityRepository implements CommunityRepositoryInterface {
  get dataSource() {
    return dataSource;
  }

  get entity() {
    return Community;
  }

  /**
   * can hand over entityManager as second argument for transaction
   */
  async save(community: Community, em?: EntityManager): Promise<Community> {
    if (!em) {
      return await community.save();
    }
    return await em.save(community);
  }

  /**
   * can hand over entityManager as second argument for transaction
   */
  async delete(community: Community, em?: EntityManager): Promise<void> {
    if (!em) {
      await this.entity.remove(community);
      return;
    }
    await em.remove(community);
    return;
  }

  /**
   * can hand over entityManager as third argument for transaction
   */
  async checkIfCommunityExists(communityId: string, em?: EntityManager): Promise<boolean> {
    const Community = this.entity;
    if (!em) {
      const isCommunityExist = await Community.countBy({ id: communityId });
      return isCommunityExist === 1;
    }

    const isCommunityExist = await em.countBy(Community, { id: communityId });
    return isCommunityExist === 1;
  }
}

export interface CommunityRepositoryInterface extends RepositoryInterface {
  save(community: Community, em?: EntityManager): Promise<Community>;
  delete(community: Community, em?: EntityManager): Promise<void>;
  checkIfCommunityExists(communityId: string, em?: EntityManager): Promise<boolean>;
  get entity(): typeof Community;
}

export default new CommunityRepository();
