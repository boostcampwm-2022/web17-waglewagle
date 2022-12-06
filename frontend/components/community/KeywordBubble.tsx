import { Loading, Modal } from '@components/common';
import useUserMe from '@hooks/useUserMe';
import styles from '@sass/components/community/KeywordBubble.module.scss';
import classnames from 'classnames/bind';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
const cx = classnames.bind(styles);

const KeywordModalContent = dynamic(
  () => import('./keyword/KeywordModalContent'),
  {
    loading: () => <Loading />,
  },
);

interface KeywordBubbleProps {
  keyword: string;
  posX: number;
  posY: number;
  radius: number;
}

// requestAnimationFrame으로 이동
const KeywordBubble = ({ keyword, posX, posY, radius }: KeywordBubbleProps) => {
  const router = useRouter();
  const communityId: string = router.query.id as string;
  const userData = useUserMe(communityId);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isOpenKeywordModal, setIsOpenKeywordModal] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleClick = () => {
    userData && setIsOpenKeywordModal(true); // 유저 정보가 있을때만 모달창을 띄워줌
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cx('bubble')}
      style={{
        transform: `translate(${posX - radius}px, ${posY - radius}px) scale(${
          isHover ? 1.2 : 1.0
        })`, // 원의 중앙이 좌표와 일치할 수 있도록 tranform
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        fontSize: `${10 + radius * 0.2}px`,
      }}
    >
      <span>{keyword}</span>
      <Modal
        isOpenModal={isOpenKeywordModal}
        closeModal={() => setIsOpenKeywordModal(false)}
      >
        <KeywordModalContent />
      </Modal>
    </div>
  );
};

export default KeywordBubble;
