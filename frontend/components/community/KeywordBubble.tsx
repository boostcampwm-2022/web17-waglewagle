import { BubbleData } from '../../types/types';
import styles from '@sass/components/community/KeywordBubble.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface KeywordBubbleProps {
  bubbleData: BubbleData;
}

const KeywordBubble = ({ bubbleData }: KeywordBubbleProps) => {
  return (
    <div
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
