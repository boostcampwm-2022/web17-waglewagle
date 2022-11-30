import classnames from 'classnames/bind';
import styles from '@sass/components/common/LoginModalContent.module.scss';
import { AiFillGithub } from 'react-icons/ai';
import config from '../../config';
const cx = classnames.bind(styles);

const LoginModalContent = () => {
  return (
    <div className={cx('container')}>
      <h2 className={cx('title')}>로그인</h2>
      <a
        href={`${config.API_HOST}/oauth2/authorization/github`}
        className={cx('github-login-button')}
      >
        <AiFillGithub />
        깃허브로 로그인하기
      </a>
    </div>
  );
};

export default LoginModalContent;
