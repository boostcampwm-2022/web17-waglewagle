import { useMemo, useState } from 'react';
import styles from '@sass/components/community/thread/ThreadUserList.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

// TODO: user 수가 많아졌을 때 레이아웃 수정
const ThreadUserList = () => {
  const [userList] = useState([
    { id: '1', username: '김관경', isOnline: true },
    { id: '2', username: '문성현', isOnline: true },
    { id: '3', username: '김대호', isOnline: false },
    { id: '4', username: '이승민', isOnline: false },
  ]);

  const onlineUserCount = useMemo(
    () => userList.filter(({ isOnline }) => isOnline).length,
    [userList],
  );

  return (
    <div className={cx('layout')}>
      <div className={cx('header')}>
        <h3 className={cx('title')}>코딩</h3>
        <p className={cx('online-count')}>
          {onlineUserCount}명이 이야기 나누는 중
        </p>
      </div>
      <ul>
        {userList.map(({ id, username, isOnline }) => (
          <li key={id} className={cx('user-list')}>
            <p className={cx('username')}>{username}</p>
            {isOnline && <div className={cx('online-badge')}></div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadUserList;
