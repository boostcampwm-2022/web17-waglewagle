import { useEffect, useRef, useState } from 'react';
import { BubbleData, KeywordData } from '../../types/types';
import KeywordBubble from './KeywordBubble';
import styles from '@sass/components/community/KeywordBubbleChart.module.scss';
import classnames from 'classnames/bind';
import CircleContainer from '../../circlepacker/CircleContainer';
import Circle from '../../circlepacker/Circle';
const cx = classnames.bind(styles);

interface KeywordBubbleChart {
  communityKeywordData: KeywordData[];
}

const KeywordBubbleChart = ({ communityKeywordData }: KeywordBubbleChart) => {
  const [bubbleDataList, setBubbleDataList] = useState<BubbleData[]>([]);
  const requestAnimationId = useRef<number>(0);
  const circleContainerRef = useRef<CircleContainer | null>(null);

  const getBubbleData = (keywordData: KeywordData, circleData: Circle) => {
    return {
      keyword: keywordData.keyword,
      count: keywordData.count,
      circle: circleData,
    };
  };

  const animate = () => {
    const update = () => {
      if (circleContainerRef.current?.isStatic) {
        cancelAnimationFrame(requestAnimationId.current);
        return;
      }

      circleContainerRef.current?.update();
      requestAnimationId.current = requestAnimationFrame(update);
    };

    update();
  };

  useEffect(() => {
    if (!circleContainerRef.current) {
      circleContainerRef.current = new CircleContainer(
        window.innerWidth,
        window.innerHeight,
      );
    }

    const bubbleDataArray = communityKeywordData.map((keywordData) => {
      const radius = keywordData.count * 10;
      const circleData = circleContainerRef.current!.addCircle(
        keywordData.keywordId,
        radius,
      );
      return getBubbleData(keywordData, circleData);
    });

    setBubbleDataList(bubbleDataArray);
  }, [communityKeywordData]);

  useEffect(() => {
    if (bubbleDataList.length) {
      animate();
    }
  }, [bubbleDataList]);

  return (
    <div className={cx('chart-container')}>
      {bubbleDataList.map((bubbleData, index) => (
        <KeywordBubble key={index} bubbleData={bubbleData} />
      ))}
    </div>
  );
};

export default KeywordBubbleChart;
