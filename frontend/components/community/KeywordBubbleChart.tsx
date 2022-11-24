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

  const getBubbleDataArray = (communityKeywordData: KeywordData[]) => {
    // TODO: 멋진 시각화 로직으로 바꾸기
    // 앞의 결과물의 위치나 크기와 비교해서 겹침을 확인해서 배치한다.
    // communityKeywordData map > 앞의 결과물을 뒤에서 처리할 때 모르잖
    return communityKeywordData.map((keywordData: KeywordData) => {
      return {
        keyword: keywordData.keyword,
        count: keywordData.count,
        posX: keywordData.count * 10,
        posY: keywordData.count * 10,
        radius: keywordData.count * 10,
      };
    });
  };

  useEffect(() => {
    const bubbleDataArray = getBubbleDataArray(communityKeywordData);
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
