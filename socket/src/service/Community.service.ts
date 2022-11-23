import CommunityRepository, {
  CommunityRepositoryInterface,
} from './../repository/Community.repository';

class CommunityService implements CommunityServiceInterface {
  constructor(private readonly communityRepository: CommunityRepositoryInterface) {}

  async checkIfCommunityExist(communityId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.communityRepository.dataSource.transaction(async (em) => {
        this.communityRepository
          .checkIfCommunityExists(communityId, em)
          .then((isExist) => resolve(isExist))
          .catch((error) => reject(error));
      });
    });
  }
}

export interface CommunityServiceInterface {
  checkIfCommunityExist(communityId: string): Promise<boolean>;
}

export default new CommunityService(CommunityRepository);
