import classnames from 'classnames/bind';
import styles from '@sass/components/common/LoginModalContent.module.scss';
import { AiFillGithub } from 'react-icons/ai';
const cx = classnames.bind(styles);

const LoginModalContent = () => {
  return (
    <div className={cx('container')}>
      <h2 className={cx('title')}>로그인</h2>
      <input className={cx('username-input')} placeholder='유저이름' />
      <button className={cx('login-button')}>로그인</button>
      <hr />
      <button className={cx('github-login-button')}>
        <AiFillGithub />
        깃허브로 로그인하기
      </button>
    </div>
  );
};

export default LoginModalContent;
