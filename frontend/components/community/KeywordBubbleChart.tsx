import { useEffect, useState } from 'react';
import { BubbleData, KeywordData } from '../../types/types';
import KeywordBubble from './KeywordBubble';
import styles from '@sass/components/community/KeywordBubbleChart.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface KeywordBubbleChart {
  communityKeywordData: KeywordData[];
}

// type ContainerData = {
//   width: number;
//   height: number;
//   startPosX: number;
//   startPosY: number;
// };

const KeywordBubbleChart = ({ communityKeywordData }: KeywordBubbleChart) => {
  // const [containerData, setContainerData] = useState<ContainerData | null>(
  //   null,
  // );
  const [bubbleDataList, setBubbleDataList] = useState<BubbleData[]>([]);
  useEffect(() => {
    const bubbleDataArray = communityKeywordData.map(
      (keywordData: KeywordData) => {
        // TODO: 멋진 시각화 로직으로 바꾸기
        return {
          keyword: keywordData.keyword,
          count: keywordData.count,
          posX: keywordData.count * 10,
          posY: keywordData.count * 10,
          radius: keywordData.count * 10,
        };
      },
    );
    setBubbleDataList(bubbleDataArray);
  }, [communityKeywordData]);
  return (
    <div className={cx('chart-container')}>
      {bubbleDataList.map((bubbleData, index) => (
        <KeywordBubble key={index} bubbleData={bubbleData} />
      ))}
    </div>
  );
};

export default KeywordBubbleChart;
