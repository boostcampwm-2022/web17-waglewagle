import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import classnames from 'classnames/bind';
import { Loading } from '@components/common';
import { KEYWORD_BUBBLE_MAX_NUMBER } from '@constants/constants';
import { useKeywordListQuery, useMyKeywordQuery } from '@hooks/keyword';
import Circle from '@utils/circlepacker/Circle';
import CircleContainer from '@utils/circlepacker/CircleContainer';
import debounce from '@utils/debounce';
import { NextPageContext } from 'next';
import KeywordBubble from './KeywordBubble';
import type { BubbleData, KeywordData, KeywordGroupData } from '#types/types';
import styles from '@sass/components/community/keyword-bubble-chart/KeywordBubbleChart.module.scss';

const cx = classnames.bind(styles);

interface KeywordBubbleChartProps {
  isMyKeywordHighlight: boolean;
  handleChangeKeywordGroupData: (newKeywordGroupDate: KeywordGroupData) => void;
}

const KeywordBubbleChart = ({
  isMyKeywordHighlight,
  handleChangeKeywordGroupData,
}: KeywordBubbleChartProps) => {
  const router = useRouter();
  const communityId: string = router.query.id as string;

  const [bubbleDataList, setBubbleDataList] = useState<BubbleData[]>([]);
  const [_, setIsMove] = useState<boolean>(false);
  const [slicedCommunityKeywordData, setSlicedCommunityKeywordData] = useState<
    KeywordData[]
  >([]);

  const requestAnimationId = useRef<NodeJS.Timer | null>(null);
  const circleContainerRef = useRef<CircleContainer | null>(null);

  const { data: myKeywordList } = useMyKeywordQuery(communityId);
  const { data: fetchedKeywordData, isLoading } =
    useKeywordListQuery(communityId);
  // 여기에서는 slice된 keywordData를 가지고 있기 때문에 fetched와 별도의 상태로 관리됨.

  const getBubbleData = (keywordData: KeywordData, circleData: Circle) => {
    const isJoined =
      myKeywordList.length > 0
        ? myKeywordList.some(
            (myKeyword) => myKeyword.keywordId === keywordData.keywordId,
          )
        : false;
    return {
      keywordId: keywordData.keywordId,
      keyword: keywordData.keywordName,
      count: keywordData.memberCount,
      circle: circleData,
      isJoined,
    };
  };

  // TODO: 애니메이션 setInrevl로 할지 requestAnimationFrame으로 할지 정해서  변수명 정하고 update 함수 리팩토링하기
  // circleContainer가 아닌 이곳에 있는 이유는, 이 함수는 연산보다는 렌더링에 가까운 로직이기 때문 (setIsMove를 토글하여 리렌더링 시킴)
  const animate = () => {
    const update = () => {
      setIsMove((prev) => !prev);
      circleContainerRef.current?.update();
    };

    requestAnimationId.current = setInterval(() => {
      update();
    }, 500);
  };

  useEffect(() => {
    if (!fetchedKeywordData) {
      return;
    }

    const slicedData = fetchedKeywordData
      .filter((keywordData) => keywordData.memberCount !== 0)
      .slice(0, KEYWORD_BUBBLE_MAX_NUMBER);
    setSlicedCommunityKeywordData(slicedData);
  }, [fetchedKeywordData]);

  useEffect(() => {
    if (!circleContainerRef.current) {
      circleContainerRef.current = new CircleContainer(
        window.innerWidth,
        window.innerHeight,
      );
    }

    const bubbleDataArray = slicedCommunityKeywordData.map((keywordData) => {
      const radius =
        keywordData.memberCount !== 1 ? 20 + keywordData.memberCount * 3 : 15;
      const circleData = circleContainerRef.current!.addCircle(
        keywordData.keywordId,
        radius,
      );

      return getBubbleData(keywordData, circleData);
    });

    setBubbleDataList(bubbleDataArray);
  }, [slicedCommunityKeywordData]);

  useEffect(() => {
    if (bubbleDataList.length) {
      animate();
    }
    // 매번 이전 interval을 지우고 새로운 interval로 교체되며 움직임이 빨라지지 않음.
    return () => {
      clearInterval(requestAnimationId.current!);
    };
  }, [bubbleDataList]);

  useEffect(() => {
    const handleResize = debounce(() => {
      circleContainerRef.current?.resize(window.innerWidth, window.innerHeight);
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={cx('chart-container')}>
      {isLoading && <Loading />}
      {bubbleDataList.map((bubbleData, index) => (
        // TODO:Lprops 깔끔하게 만들기
        <KeywordBubble
          key={index}
          isHighlight={isMyKeywordHighlight}
          isJoined={bubbleData.isJoined}
          keywordId={bubbleData.keywordId}
          keyword={bubbleData.keyword}
          memberCount={bubbleData.count}
          posX={bubbleData.circle.x}
          posY={bubbleData.circle.y}
          radius={bubbleData.circle.radius}
          handleChangeKeywordGroupData={handleChangeKeywordGroupData}
        />
      ))}
    </div>
  );
};

export default KeywordBubbleChart;

export const getServerSideProps = async ({ query }: NextPageContext) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['keyword', query.id]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
