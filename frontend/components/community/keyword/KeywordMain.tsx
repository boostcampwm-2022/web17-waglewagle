import { useState } from 'react';
import { KeywordData } from '../../../types/types';
import ThreadList from './ThreadList';
import styles from '@sass/components/community/keyword/KeywordMain.module.scss';
import classnames from 'classnames/bind';
import PostThread from './ThreadForm';
const cx = classnames.bind(styles);

const KeywordMain = () => {
  const [keywordData] = useState<KeywordData>({
    keywordId: '1',
    keywordName: '코딩',
    memberCount: 3,
  });

  return (
    <main className={cx('main')}>
      <div className={cx('header')}>
        <h3 className={cx('title')}>{keywordData.keywordName}</h3>
        <p className={cx('user-count')}>
          {keywordData.memberCount}명이 관심을 보임
        </p>
      </div>
      <ThreadList />
      <PostThread />
    </main>
  );
};

export default KeywordMain;
