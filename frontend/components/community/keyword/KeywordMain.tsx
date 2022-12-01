import { useState } from 'react';
import { KeywordData, ThreadData } from '../../../types/types';
import ThreadList from './ThreadList';
import styles from '@sass/components/community/keyword/KeywordMain.module.scss';
import classnames from 'classnames/bind';
import PostThread from './ThreadForm';
import Sidebar from './Sidebar';
const cx = classnames.bind(styles);

const KeywordMain = () => {
  const [threadSidebar, setThreadSidebar] = useState<
    Partial<ThreadData> & { isOpen: boolean }
  >({
    isOpen: false,
  });

  const [keywordData] = useState<KeywordData>({
    keywordId: '1',
    keywordName: '코딩',
    memberCount: 3,
  });

  const toggleSidebar = (thread: ThreadData) => {
    if (!threadSidebar.isOpen) {
      setThreadSidebar({ isOpen: true, ...thread });
      return;
    }
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
          <ThreadList toggleSidebar={toggleSidebar} />
          <PostThread />
        </div>
        {threadSidebar.isOpen && <Sidebar {...threadSidebar} />}
      </div>
    </main>
  );
};

export default KeywordMain;
