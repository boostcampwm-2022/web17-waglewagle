import { useState } from 'react';
import { KeywordData, ThreadData } from '../../../types/types';
import ThreadList from './ThreadList';
import styles from '@sass/components/community/keyword/KeywordMain.module.scss';
import classnames from 'classnames/bind';
import PostThread from './ThreadForm';
import Sidebar from './Sidebar';
const cx = classnames.bind(styles);

type Sidebar = { isOpen: false } | (ThreadData & { isOpen: true });

const KeywordMain = () => {
  const [threadSidebar, setThreadSidebar] = useState<Sidebar>({
    isOpen: false,
  });

  const [keywordData] = useState<KeywordData>({
    keywordId: '1',
    keywordName: '코딩',
    memberCount: 3,
  });

  const openSidebar = (thread: ThreadData) => {
    setThreadSidebar({ isOpen: true, ...thread });
  };

  const closeSidebar = () => {
    setThreadSidebar({ isOpen: false });
  };

  return (
    <main className={cx('main')}>
      <div className={cx('header')}>
        <h3 className={cx('title')}>{keywordData.keywordName}</h3>
        <p className={cx('user-count')}>
          {keywordData.memberCount}명이 관심을 보임
        </p>
      </div>
      <div className={cx('content')}>
        <div>
          <ThreadList openSidebar={openSidebar} />
          <PostThread />
        </div>
        {threadSidebar.isOpen && (
          <Sidebar {...threadSidebar} closeSidebar={closeSidebar} />
        )}
      </div>
    </main>
  );
};

export default KeywordMain;
