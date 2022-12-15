import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import { Loading } from '@components/common';
import { useKeywordListQuery } from '@hooks/keyword';
import styles from '@sass/components/community/CommunityKeywordList.module.scss';
import { KeywordData, KeywordGroupData } from '#types/types';

const cx = classnames.bind(styles);

interface CommunityKeywordListProps {
  handleChangeKeywordGroupData: (newKeywordGroupDate: KeywordGroupData) => void;
}

const CommunityKeywordList = ({
  handleChangeKeywordGroupData,
}: CommunityKeywordListProps) => {
  const router = useRouter();
  const communityId: string = router.query.id as string;
  const { data: fetchedKeywordData, isLoading } =
    useKeywordListQuery(communityId);

  const onClickItem = (keywordData: KeywordData) => {
    handleChangeKeywordGroupData({
      keywordId: keywordData.keywordId,
      keyword: keywordData.keywordName,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <h3 className={cx('list-title')}>키워드 목록</h3>
      <ul className={cx('list-container')}>
        {fetchedKeywordData?.map((keywordData) => (
          <li
            key={keywordData.keywordId}
            onClick={() => onClickItem(keywordData)}
            className={cx('list-item')}
          >
            {keywordData.keywordName} ({keywordData.memberCount})
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommunityKeywordList;
