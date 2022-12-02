import dataSource from '../../database/data-source';
import { User } from './user.entity';

const handleUserProfile = ({
  id,
  login,
  avatar_url,
}: {
  id: string;
  login: string;
  avatar_url: string;
}): Promise<User> => {
  return new Promise((resolve, reject) => {
    dataSource.transaction(async (em) => {
      const existingUser = await em.getRepository(User).findOne({
        where: {
          oauthKey: id,
          oauthMethod: 'GITHUB',
        },
      });
      if (existingUser) return resolve(existingUser);

      const user = new User();
      user.oauthMethod = 'GITHUB';
      user.oauthKey = id;
      user.username = (await em.getRepository(User).findOneBy({ username: login })) ? crypto.randomUUID() : login;
      user.profileImageUrl = avatar_url;
      return resolve(em.save(user));
    });
  });
};

export { handleUserProfile };
