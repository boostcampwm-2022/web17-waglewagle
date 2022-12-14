import { useState } from 'react';
import classnames from 'classnames/bind';
import KeywordGroupSidebar from '@components/community/keyword-group/KeywordGroupSidebar';
import { useKeywordUserListQuery } from '@hooks/keyword';
import PostThread from './ThreadForm';
import ThreadList from './ThreadList';
import styles from '@sass/components/community/keyword-group/KeywordMain.module.scss';
const cx = classnames.bind(styles);

type Sidebar = { isOpen: boolean; threadId: string };

interface KeywordGroupMainProps {
  keywordId: string;
  keyword: string;
}

const KeywordGroupMain = ({ keywordId, keyword }: KeywordGroupMainProps) => {
  const [threadSidebar, setThreadSidebar] = useState<Sidebar>({
    isOpen: false,
    threadId: '0',
  });

  const { data: userList } = useKeywordUserListQuery(keywordId);

  const openSidebar = (threadId: string) => {
    setThreadSidebar({ isOpen: true, threadId });
  };

  const closeSidebar = () => {
    setThreadSidebar({ isOpen: false, threadId: '0' });
  };

  return (
    <main className={cx('main')}>
      <div className={cx('header')}>
        <h3 className={cx('title')}>{keyword}</h3>
        <p className={cx('user-count')}>{userList?.length}명이 관심을 보임</p>
      </div>
      <div className={cx('content')}>
        <div>
          <ThreadList keywordId={keywordId} openSidebar={openSidebar} />
          <PostThread keywordId={keywordId} />
        </div>
        <KeywordGroupSidebar
          {...threadSidebar}
          keywordId={keywordId}
          closeSidebar={closeSidebar}
        />
      </div>
    </main>
  );
};

export default KeywordGroupMain;
