import classnames from 'classnames/bind';
import styles from '@sass/components/common/LoginModalContent.module.scss';
import { ChangeEvent, useState } from 'react';
import apis from '../../apis/apis';
const cx = classnames.bind(styles);

interface LoginModalContentProps {
  closeLoginModal: () => void;
}

const LoginModalContent = ({ closeLoginModal }: LoginModalContentProps) => {
  const [username, setUsername] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmitUsernameLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // localStorage.setItem('waglewagle-username', username); // 임시 유저데이터
    apis.fetchLogin(username);
    setUsername('');
    closeLoginModal();
  };

  return (
    <div className={cx('container')}>
      <h2 className={cx('title')}>로그인</h2>
      <form
        className={cx('username-login-form')}
        onSubmit={handleSubmitUsernameLogin}
      >
        <input
          value={username}
          onChange={onChange}
          className={cx('username-input')}
          placeholder='유저이름'
        />
        <button type='submit' className={cx('login-button')}>
          로그인
        </button>
      </form>
      {/* <hr /> */}
      {/* <button className={cx('github-login-button')}>
        <AiFillGithub />
        깃허브로 로그인하기
      </button> */}
    </div>
  );
};

export default LoginModalContent;
