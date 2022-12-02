import { User } from './user.entity';
import requestHandler from '../../types/request-handler.type';
import ENV from '../../conf/env';
import axios from 'axios';
import * as userRepository from './user.repository';

const redirectToGithubLogin: requestHandler = (_, res) => {
  res.redirect(
    `${ENV.GITHUB.REQUEST_LOGIN_URL}?client_id=${ENV.GITHUB.CLIENT_ID}&redirect_uri=${ENV.SERVER.HOST}${ENV.GITHUB.REDIRECT_URL}&scope=user:email`
  );
};

const handleAuthenticationCode: requestHandler = async (req, res) => {
  const code = req.query.code as string | undefined;
  if (!code) {
    res.redirect(ENV.SERVER.HOST);
  }

  axios
    .post(
      ENV.GITHUB.REQUEST_TOKEN_URL,
      {
        client_id: ENV.GITHUB.CLIENT_ID,
        client_secret: ENV.GITHUB.CLIENT_SECRET,
        code,
        redirect_uri: ENV.SERVER.HOST + ENV.GITHUB.REDIRECT_URL,
      },
      {
        headers: {
          Accept: 'application/json',
          'accept-encoding': null,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      }
    )
    .then(({ data }) => {
      const { access_token: accessToken } = data as { access_token: string };

      axios
        .get(ENV.GITHUB.REQUEST_USER_PROFILE, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'accept-encoding': null,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        })
        .then(({ data }) => {
          const { id, login, avatar_url } = data as { id: number; login: string; avatar_url: string };
          userRepository.handleUserProfile({ id: id.toString(), login, avatar_url }).then((user) => {
            res.cookie('user_id', user.id, { expires: new Date(Date.now() + 900000), httpOnly: true });
            res.redirect('/');
          });
        });
    });
};

export { redirectToGithubLogin, handleAuthenticationCode };
