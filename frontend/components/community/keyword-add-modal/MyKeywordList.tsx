import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import styles from '@sass/components/community/MyKeywordList.module.scss';
import { useMyKeywordQuery } from '@hooks/keyword';
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
