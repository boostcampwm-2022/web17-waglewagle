import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import styles from '@sass/components/community/CommunityKeywordList.module.scss';
import { useKeywordListQuery } from '@hooks/keyword';
import { Loading } from '@components/common';

const cx = classnames.bind(styles);

const CommunityKeywordList = () => {
  const router = useRouter();
  const communityId: string = router.query.id as string;
  const { data: fetchedKeywordData, isLoading } =
    useKeywordListQuery(communityId);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <h3 className={cx('list-title')}>키워드 목록</h3>
      <ul className={cx('list-container')}>
        {fetchedKeywordData?.map((keywordData) => (
          <li key={keywordData.keywordId} className={cx('list-item')}>
            {keywordData.keywordName} ({keywordData.memberCount})
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommunityKeywordList;
