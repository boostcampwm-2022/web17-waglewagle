import { useState, MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import MouseModal from '@components/common/MouseModal';
import useUserMe from '@hooks/useUserMe';
import KeywordGroupEnterModalContent from './KeywordGroupEnterModalContent';
import KeywordGroupInfoModalContent from './KeywordGroupInfoModalContent';
import type { ClickPosData, KeywordGroupData } from '#types/types';
import styles from '@sass/components/community/keyword-bubble-chart/KeywordBubble.module.scss';

const cx = classnames.bind(styles);

interface KeywordBubbleProps {
  isJoined: boolean;
  isHighlight: boolean;
  keywordId: string;
  keyword: string;
  memberCount: number;
  posX: number;
  posY: number;
  radius: number;
  handleChangeKeywordGroupData: (newKeywordGroupData: KeywordGroupData) => void;
}

// requestAnimationFrame으로 이동
const KeywordBubble = ({
  isHighlight,
  isJoined,
  keywordId,
  keyword,
  memberCount,
  posX,
  posY,
  radius,
  handleChangeKeywordGroupData,
}: KeywordBubbleProps) => {
  const router = useRouter();
  const communityId: string = router.query.id as string;
  const [isOpenKeywordModal, setIsOpenKeywordModal] = useState<boolean>(false);
  const [modalPosData, setModalPosData] = useState<ClickPosData>();
  const userData = useUserMe(communityId);

  const closeKeywordModal = () => {
    setTimeout(() => {
      setIsOpenKeywordModal(false);
    }); // TODO: setTimeout을 사용해야 닫을 수 있음.
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isOpenKeywordModal) {
      setModalPosData({ x: e.clientX, y: e.clientY });
      setIsOpenKeywordModal(true);
    }
  };

  return (
    <div
      onClick={userData && handleClick}
      className={cx('bubble', { highlight: isHighlight && isJoined })}
      style={{
        transform: `translate(${posX - radius}px, ${posY - radius}px)`,
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        fontSize: `${12 + radius * 0.2}px`,
      }}
    >
      <div>
        <span>{keyword}</span>
      </div>
      <MouseModal
        left={modalPosData?.x}
        top={modalPosData?.y}
        isOpenModal={isOpenKeywordModal}
        closeModal={() => setIsOpenKeywordModal(false)}
      >
        {isJoined ? (
          <KeywordGroupEnterModalContent
            keywordId={keywordId}
            keyword={keyword}
            memberCount={memberCount}
            handleChangeKeywordGroupData={handleChangeKeywordGroupData}
            closeKeywordModal={closeKeywordModal}
          />
        ) : (
          <KeywordGroupInfoModalContent
            keywordId={keywordId}
            keyword={keyword}
            memberCount={memberCount}
            closeKeywordModal={closeKeywordModal}
          />
        )}
      </MouseModal>
    </div>
  );
};

export default KeywordBubble;
