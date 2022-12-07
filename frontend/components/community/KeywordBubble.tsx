import { Modal } from '@components/common';
import useUserMe from '@hooks/useUserMe';
import styles from '@sass/components/community/KeywordBubble.module.scss';
import classnames from 'classnames/bind';
import { useState } from 'react';
import KeywordModalContent from './keyword/KeywordModalContent';
const cx = classnames.bind(styles);

interface KeywordBubbleProps {
  keyword: string;
  posX: number;
  posY: number;
  radius: number;
}

// requestAnimationFrame으로 이동
const KeywordBubble = ({ keyword, posX, posY, radius }: KeywordBubbleProps) => {
  const userData = useUserMe();
  const [isOpenKeywordModal, setIsOpenKeywordModal] = useState<boolean>(false);

  const handleClick = () => {
    userData && setIsOpenKeywordModal(true); // 유저 정보가 있을때만 모달창을 띄워줌
  };

  return (
    <div
      onClick={handleClick}
      className={cx('bubble')}
      style={{
        transform: `translate(${posX - radius}px, ${posY - radius}px)`,
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        fontSize: `${10 + radius * 0.2}px`,
      }}
    >
      <div>
        <span>{keyword}</span>
      </div>
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
