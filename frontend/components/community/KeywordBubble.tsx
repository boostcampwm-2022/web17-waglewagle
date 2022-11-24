import { BubbleData } from '../../types/types';
import styles from '@sass/components/community/KeywordBubble.module.scss';
import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
const cx = classnames.bind(styles);

interface KeywordBubbleProps {
  bubbleData: BubbleData;
}

// requestAnimationFrame으로 이동
const KeywordBubble = ({ bubbleData }: KeywordBubbleProps) => {
  // TODO : 이거... 맞아...?
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cx('bubble')}
      style={{
        transform: `translate(${
          bubbleData.circle.x - bubbleData.circle.radius
        }px, ${bubbleData.circle.y - bubbleData.circle.radius}px) scale(${
          isHover ? 1.2 : 1.0
        })`,
        width: `${bubbleData.circle.radius * 5}px`,
        height: `${bubbleData.circle.radius * 5}px`,
        fontSize: `${10 + bubbleData.circle.radius * 1}px`,
      }}
    >
      <span>{bubbleData.keyword}</span>
    </div>
  );
};

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
