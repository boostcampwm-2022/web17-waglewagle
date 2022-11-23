import CommunityUserRepository, {
  CommunityUserRepositoryInterface,
} from './../repository/CommunityUser.repository';

class CommunityUserService {
  constructor(private readonly CommunityUserRepository: CommunityUserRepositoryInterface) {}

  async isUserInCommunity(userId: string, communityId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.CommunityUserRepository.dataSource.manager.transaction(async (em) => {
        this.CommunityUserRepository.checkIfUserInCommunity(userId, communityId, em)
          .then((isUserInCommunity) => resolve(isUserInCommunity))
          .catch((error) => reject(error));
      });
    });
  }
}

export interface CommunityUserServiceInterface {
  isUserInCommunity(userId: string, communityId: string): Promise<boolean>;
}

export default new CommunityUserService(CommunityUserRepository);
