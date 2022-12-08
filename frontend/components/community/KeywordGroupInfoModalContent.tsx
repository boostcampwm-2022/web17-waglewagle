import useJoinKeywordMutation from '@hooks/useJoinKeywordMutation';
import { useRouter } from 'next/router';
import styles from '@sass/components/community/KeywordGroupInfoModalContent.module.scss';
import classnames from 'classnames/bind';
import { DefaultButton } from '@components/common';
const cx = classnames.bind(styles);

interface KeywordGroupInfoModalContentProps {
  keywordId: string;
  keyword: string;
  memberCount: number;
}

const KeywordGroupInfoModalContent = ({
  keywordId,
  keyword,
  memberCount,
}: KeywordGroupInfoModalContentProps) => {
  const router = useRouter();
  const communityId = router.query.id as string;
  const { mutate: mutateJoinKeyword } = useJoinKeywordMutation();

  const handleClickEnter = async () => {
    mutateJoinKeyword({ keywordId, keywordName: keyword, communityId });
    // 왜 여기에서는 closeKeywordModal()이 함수가 아니라고 할까?
  };

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
        handleClick={handleClickEnter}
      >
        나도 관심 있어요
      </DefaultButton>
    </div>
  );
};

export default KeywordGroupInfoModalContent;