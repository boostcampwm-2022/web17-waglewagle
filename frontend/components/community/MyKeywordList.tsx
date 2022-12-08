import { MyKeywordData } from '#types/types';
import useMyKeywordQuery from '@hooks/useMyKeywordQuery';
import styles from '@sass/components/community/MyKeywordList.module.scss';
import classnames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MyKeyword from './MyKeyword';
const cx = classnames.bind(styles);

const MyKeywordList = () => {
  const router = useRouter();
  const communityId = router.query.id as string;
  const { data: myKeywordList } = useMyKeywordQuery(communityId);

  return (
    <ol className={cx('list-container')}>
      {myKeywordList &&
        myKeywordList.map((keywordData) => (
          <MyKeyword key={keywordData.keywordId} keywordData={keywordData} />
        ))}
    </ol>
  );
};

export default MyKeywordList;
