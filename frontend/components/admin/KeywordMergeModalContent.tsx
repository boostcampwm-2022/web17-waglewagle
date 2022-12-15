import { useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import { useKeywordMergeMutation } from '@hooks/keyword';
import styles from '@sass/components/admin/KeywordMergeModalContent.module.scss';
const cx = classnames.bind(styles);

type Keyword = {
  keywordId: string;
  keywordName: string;
  memberCount: number;
  isSelected: boolean;
};

interface KeywordMergeModalContentProps {
  selectedKeywordList: Keyword[];
  closeModal(): void;
}

function KeywordMergeModalContent({
  selectedKeywordList,
  closeModal,
}: KeywordMergeModalContentProps) {
  const router = useRouter();
  const { id } = router.query;

  const [selectedKeywordId, setSelectedKeywordId] = useState('');

  const { mutate } = useKeywordMergeMutation({
    communityId: id as string,
    destinationKeywordId: selectedKeywordId,
    sourceKeywordIdList: selectedKeywordList
      .map((selectedKeyword) => selectedKeyword.keywordId)
      .filter((keywordId) => keywordId !== selectedKeywordId),
    handleSuccess: closeModal,
  });

  return (
    <div>
      <p>어떤 키워드로 병합할지 선택해주세요</p>
      <ul className={cx('keyword-list')}>
        {selectedKeywordList.map((keyword) => (
          <li
            key={keyword.keywordId}
            className={cx('keyword', {
              selected: keyword.keywordId === selectedKeywordId,
            })}
            onClick={() => {
              setSelectedKeywordId(keyword.keywordId);
            }}
          >
            {keyword.keywordName}({keyword.memberCount})
          </li>
        ))}
      </ul>
      <div className={cx('buttons')}>
        <button onClick={() => mutate()}>병합</button>
        <button onClick={() => closeModal()}>취소</button>
      </div>
    </div>
  );
}

export default KeywordMergeModalContent;
