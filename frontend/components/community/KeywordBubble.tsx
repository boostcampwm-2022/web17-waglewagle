import { BubbleData } from '../../types/types';
import styles from '@sass/components/community/KeywordBubble.module.scss';
import classnames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Circle from '../../circlepacker/Circle';
const cx = classnames.bind(styles);

interface KeywordBubbleProps {
  bubbleData: BubbleData;
}

const KeywordBubble = ({ bubbleData }: KeywordBubbleProps) => {
  const bubbleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const circle = new Circle(1, 1, 1, { x: 1, y: 1 });

    const test = () => {
      console.log(circle);
    };

    test();
  }, []);

  return (
    <div
      ref={bubbleRef}
      className={cx('bubble')}
      style={{
        transform: `translate(${bubbleData.posX}px, ${bubbleData.posY}px)`,
        width: `${bubbleData.radius * 5}px`,
        height: `${bubbleData.radius * 5}px`,
        fontSize: `${10 + bubbleData.radius * 1}px`,
      }}
    >
      <span>{bubbleData.keyword}</span>
    </div>
  );
};

export default KeywordBubble;
