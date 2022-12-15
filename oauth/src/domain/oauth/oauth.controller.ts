import ENV from '../../conf/env';
import requestHandler from '../../types/request-handler.type';
import requestMethod from '../../types/request-method.type';
import { redirectToGithubLogin, handleAuthenticationCode } from './oauth.service';

const oauthController: { [key: string]: { method: requestMethod; handler: requestHandler } } = Object.freeze({
  ['/oauth2/login/github']: { method: 'get', handler: redirectToGithubLogin },
  [ENV.GITHUB.REDIRECT_URL]: { method: 'get', handler: handleAuthenticationCode },
});

export default oauthController;
