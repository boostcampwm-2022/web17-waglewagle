import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import { DefaultButton } from '@components/common';
import {
  useDisjoinKeywordMutation,
  useRelatedKeywordList,
} from '@hooks/keyword';
import type { KeywordGroupData, KeywordRelatedData } from '#types/types';
import styles from '@sass/components/community/keyword-bubble-chart/KeywordGroupEnterModalContent.module.scss';

const cx = classnames.bind(styles);

interface KeywordGroupEnterModalContentProps {
  keywordId: string;
  keyword: string;
  memberCount: number;
  handleChangeKeywordGroupData: (newKeywordGroupData: KeywordGroupData) => void;
  closeKeywordModal: () => void;
}

const KeywordGroupEnterModalContent = ({
  keywordId,
  keyword,
  memberCount,
  handleChangeKeywordGroupData,
  closeKeywordModal,
}: KeywordGroupEnterModalContentProps) => {
  const router = useRouter();
  const communityId = router.query.id as string;
  const [slicedRelatedKeyword, setSlicedRelatedKeyword] = useState<
    KeywordRelatedData[]
  >([]);
  const { data: relatedKeywordList } = useRelatedKeywordList({
    keywordId,
    keywordName: keyword,
  });
  const { mutate: mutateDisjoinKeyword } = useDisjoinKeywordMutation();

  const handleClickDisjoin = async () => {
    mutateDisjoinKeyword({ keywordId, communityId });
    closeKeywordModal();
  };

  useEffect(() => {
    setSlicedRelatedKeyword(relatedKeywordList.slice(0, 3)); // 3개의 추천 키워드를 보여줌.
  }, [relatedKeywordList]);

  return (
    <div className={cx('container')}>
      <div className={cx('description')}>
        <span className={cx('title')}>{keyword}</span>
        <span className={cx('count')}>{memberCount}명이 관심을 보임</span>
      </div>
      <DefaultButton
        width={200}
        height={35}
        fontSize={14}
        handleClick={() => {
          handleChangeKeywordGroupData({ keywordId, keyword });
          closeKeywordModal();
        }}
      >
        소그룹 입장
      </DefaultButton>
      <button onClick={handleClickDisjoin} className={cx('disjoin')}>
        관심 해제하기
      </button>
      <div className={cx('related-keyword')}>
        <span>추천 키워드</span>
        <ul>
          {slicedRelatedKeyword.map((relatedKeyword) => (
            <li key={relatedKeyword.keywordId}>{relatedKeyword.keywordName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KeywordGroupEnterModalContent;
