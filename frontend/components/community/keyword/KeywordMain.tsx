import { useState } from 'react';
import { KeywordData } from '../../../types/types';
import ThreadList from './ThreadList';
import styles from '@sass/components/community/keyword/KeywordMain.module.scss';
import classnames from 'classnames/bind';
import PostThread from './ThreadForm';
const cx = classnames.bind(styles);

const KeywordMain = () => {
  const [threadSidebar, setThreadSidebar] = useState({
    isOpen: false,
    threadId: '',
  });
  const [isClosing, setIsClosing] = useState(false);

  const [keywordData] = useState<KeywordData>({
    keywordId: '1',
    keywordName: '코딩',
    memberCount: 3,
  });

  const toggleSidebar = (id: string) => {
    if (!threadSidebar.isOpen) {
      setThreadSidebar({ isOpen: true, threadId: id });
      return;
    }
    setIsClosing(true);
    setTimeout(() => {
      setThreadSidebar({ isOpen: false, threadId: '' });
      setIsClosing(false);
    }, 500);
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
        {threadSidebar.isOpen && (
          <div className={cx('sidebar', { close: isClosing })}>
            <h4>스레드</h4>
          </div>
        )}
      </div>
    </main>
  );
};

export default KeywordMain;
