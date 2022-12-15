import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import { DefaultButton } from '@components/common';
import { useJoinKeywordMutation } from '@hooks/keyword';
import styles from '@sass/components/community/keyword-bubble-chart/KeywordGroupInfoModalContent.module.scss';

const cx = classnames.bind(styles);

interface KeywordGroupInfoModalContentProps {
  keywordId: string;
  keyword: string;
  memberCount: number;
  closeKeywordModal: () => void;
}

const KeywordGroupInfoModalContent = ({
  keywordId,
  keyword,
  memberCount,
  closeKeywordModal,
}: KeywordGroupInfoModalContentProps) => {
  const router = useRouter();
  const communityId = router.query.id as string;
  const { mutate: mutateJoinKeyword } = useJoinKeywordMutation();

  const handleClickEnter = async () => {
    mutateJoinKeyword({ keywordId, keywordName: keyword, communityId });
    closeKeywordModal();
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
