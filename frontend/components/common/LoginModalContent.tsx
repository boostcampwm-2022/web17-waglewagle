import classnames from 'classnames/bind';
import GithubIcon from '@public/images/icons/github.svg';
import config from '../../config';
import styles from '@sass/components/common/LoginModalContent.module.scss';
const cx = classnames.bind(styles);

const LoginModalContent = () => {
  return (
    <div className={cx('container')}>
      <h2 className={cx('title')}>로그인</h2>
      <a
        href={`${config.HOST}/oauth2/login/github`}
        className={cx('github-login-button')}
      >
        <GithubIcon />
        깃허브로 로그인하기
      </a>
    </div>
  );
};

export default LoginModalContent;
