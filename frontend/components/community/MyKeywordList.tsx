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

  const [slicedMyKeyword, setSlicedMyKeyword] = useState<MyKeywordData[]>([]);

  useEffect(() => {
    // TODO: 개발을 위해서 최신순으로 정렬해둠. 이후에 삭제하기
    setSlicedMyKeyword(
      myKeywordList
        .sort((a, b) => parseInt(b.keywordId) - parseInt(a.keywordId))
        .slice(0, 3),
    );
  }, [myKeywordList]);

  return (
    <ol className={cx('list-container')}>
      {slicedMyKeyword &&
        slicedMyKeyword.map((keywordData) => (
          <MyKeyword key={keywordData.keywordId} keywordData={keywordData} />
        ))}
    </ol>
  );
};

export default MyKeywordList;
