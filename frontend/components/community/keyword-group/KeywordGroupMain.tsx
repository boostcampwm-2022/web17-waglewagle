import { KeywordData, ThreadData } from '#types/types';
import KeywordGroupSidebar from '@components/community/keyword-group/KeywordGroupSidebar';
import styles from '@sass/components/community/keyword/KeywordMain.module.scss';
import classnames from 'classnames/bind';
import { useState } from 'react';
import PostThread from './ThreadForm';
import ThreadList from './ThreadList';
const cx = classnames.bind(styles);

type Sidebar = { isOpen: false } | (ThreadData & { isOpen: true });

const KeywordGroupMain = () => {
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
          <KeywordGroupSidebar {...threadSidebar} closeSidebar={closeSidebar} />
        )}
      </div>
    </main>
  );
};

export default KeywordGroupMain;
