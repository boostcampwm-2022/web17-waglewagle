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
  if (typeof code !== 'string') {
    res.redirect(ENV.SERVER.HOST);
    return;
  }

  const access_token = await getAccessToken(code);
  const { id, login, avatar_url, email } = await getUserProfile(access_token);
  const user = await userRepository.handleUserProfile({ id: id.toString(), login, avatar_url, email });
  res.cookie('user_id', user.id, { httpOnly: true });
  res.redirect('/');
  return;
};

const getAccessToken = async (code: string) => {
  const { data } = await axios.post(
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
  );

  return data.access_token as string;
};

const getUserProfile = async (accessToken: string) => {
  const { data } = await axios.get(ENV.GITHUB.REQUEST_USER_PROFILE, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'accept-encoding': null,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });
  const { id, login, avatar_url, email } = data as { id: number; login: string; avatar_url: string; email?: string };
  return { id, login, avatar_url, email };
};

export { redirectToGithubLogin, handleAuthenticationCode };
