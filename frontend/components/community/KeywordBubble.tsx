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

// TODO: 지우기
// setInterval로 이동 => 0, 0부터 이동
// const KeywordBubble = ({ bubbleData }: KeywordBubbleProps) => {
//   const bubbleRef = useRef<HTMLDivElement | null>(null);
//   const [posX, setPosX] = useState<number>(0);
//   const [posY, setPosY] = useState<number>(0);

//   useEffect(() => {
//     const animate = () => {
//       const circle = new Circle(3, 3, 5, { x: 100, y: 100 }, 3);

//       const update = () => {
//         if (circle.isMoving) {
//           const { x, y } = circle.move();

//           setPosX(x);
//           setPosY(y);
//         } else {
//           clearInterval(intervalId);
//           console.log('끝');
//         }
//       };

//       update();

//       const intervalId = setInterval(() => {
//         update();
//       }, 10);
//     };

//     animate();
//   }, []);

//   return (
//     <div
//       ref={bubbleRef}
//       className={cx('bubble')}
//       style={{
//         transform: `translate(${posX}px, ${posY}px)`,
//         width: `${bubbleData.radius * 5}px`,
//         height: `${bubbleData.radius * 5}px`,
//         fontSize: `${10 + bubbleData.radius * 1}px`,
//       }}
//     >
//       <span>{bubbleData.keyword}</span>
//     </div>
//   );
// };

// ref로 구현한 버블차트

// const KeywordBubble = ({ bubbleData }: KeywordBubbleProps) => {
//   const bubbleRef = useRef<HTMLDivElement | null>(null);
//   const [posX, setPosX] = useState<number>(0);
//   const [posY, setPosY] = useState<number>(0);

//   useEffect(() => {
//     console.log('시작');

//     const circle = new Circle(3, 3, 5, { x: 100, y: 100 }, 3);
//     const intervalId = setInterval(() => {
//       if (circle.isMoving) {
//         const { x, y } = circle.move();
//         if (bubbleRef.current) {
//           bubbleRef.current.style.transform = `translate(${x}px, ${y}px)`;
//         }
//       } else {
//         clearInterval(intervalId);
//         console.log('끝');
//       }
//     }, 10);
//   }, []);

//   return (
//     <div
//       ref={bubbleRef}
//       className={cx('bubble')}
//       style={{
//         // transform: `translate(${posX}px, ${posY}px)`,
//         width: `${bubbleData.radius * 5}px`,
//         height: `${bubbleData.radius * 5}px`,
//         fontSize: `${10 + bubbleData.radius * 1}px`,
//       }}
//     >
//       <span>{bubbleData.keyword}</span>
//     </div>
//   );
// };

// export default KeywordBubble;

export default KeywordBubble;
