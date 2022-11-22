import { EntityManager } from 'typeorm';
import { CommunityUser } from './../entity/CommunityUser';
import dataSource from './data-source';
import RepositoryInterface from './repository.interface';

class CommunityUserRepository implements CommunityUserRepositoryInterface {
  get dataSource() {
    return dataSource;
  }

  get entity() {
    return CommunityUser;
  }

  /**
   * can hand over entityManager as second argument for transaction
   */
  async save(communityUser: CommunityUser, em?: EntityManager): Promise<CommunityUser> {
    if (!em) {
      return await communityUser.save();
    }

    return await em.save(communityUser);
  }

  /**
   * can hand over entityManager as second argument for transaction
   */
  async delete(communityUser: CommunityUser, em?: EntityManager): Promise<void> {
    if (!em) {
      await this.entity.remove(communityUser);
      return;
    }
    await em.remove(communityUser);
    return;
  }

  /**
   * can hand over entityManager as third argument for transaction
   */
  async checkIfUserInCommunity(
    userId: string,
    communityId: string,
    em?: EntityManager
  ): Promise<boolean> {
    if (!em) {
      const isUserInCommunity = await this.entity.countBy({
        communityId,
        userId,
      });
      return isUserInCommunity === 1;
    }

    const isUserInCommunity = await em.countBy(this.entity, {
      communityId,
      userId,
    });
    return isUserInCommunity === 1;
  }
}

export interface CommunityUserRepositoryInterface extends RepositoryInterface {
  save(communityUser: CommunityUser, em?: EntityManager): Promise<CommunityUser>;
  delete(communityUser: CommunityUser, em?: EntityManager): Promise<void>;
  checkIfUserInCommunity(userId: string, communityId: string, em?: EntityManager): Promise<boolean>;
  get entity(): typeof CommunityUser;
}

export default new CommunityUserRepository();
