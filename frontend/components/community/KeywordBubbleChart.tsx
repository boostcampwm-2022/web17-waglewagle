import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { BubbleData, KeywordData } from '../../types/types';
import KeywordBubble from './KeywordBubble';
import styles from '@sass/components/community/KeywordBubbleChart.module.scss';
import classnames from 'classnames/bind';
import CircleContainer from '../../circlepacker/CircleContainer';
import Circle from '../../circlepacker/Circle';
import apis from '../../apis/apis';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { NextPageContext } from 'next';
const cx = classnames.bind(styles);

const KeywordBubbleChart = () => {
  const router = useRouter();
  const communityId: string = router.query.id as string;
  const [communityKeywordData, setCommunityKeywordData] = useState<
    KeywordData[]
  >([]);
  const [bubbleDataList, setBubbleDataList] = useState<BubbleData[]>([]);
  const [_, setIsMove] = useState<boolean>(false);
  const requestAnimationId = useRef<NodeJS.Timer | null>(null);
  const circleContainerRef = useRef<CircleContainer | null>(null);

  const { data } = useQuery<KeywordData[]>(
    ['keyword', communityId],
    () => {
      const data = apis.getKeywords(communityId);
      return data;
    },
    {
      enabled: !!communityId,
      refetchInterval: 1000,
    },
  );

  const getBubbleData = (keywordData: KeywordData, circleData: Circle) => {
    return {
      keyword: keywordData.keywordName,
      count: keywordData.memberCount,
      circle: circleData,
    };
  };

  // TODO: 애니메이션 setInrevl로 할지 requestAnimationFrame으로 할지 정해서  변수명 정하고 update 함수 리팩토링하기
  const animate = () => {
    const update = () => {
      if (circleContainerRef.current?.isStatic) {
        clearInterval(requestAnimationId.current!);
        return;
      }

      setIsMove((prev) => !prev);
      circleContainerRef.current?.update();
    };

    requestAnimationId.current = setInterval(() => {
      update();
    }, 300);
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    const slicedData = data.slice(0, 30);
    setCommunityKeywordData(slicedData);
  }, [data]);

  useEffect(() => {
    if (!circleContainerRef.current) {
      circleContainerRef.current = new CircleContainer(
        window.innerWidth,
        window.innerHeight,
      );
    }

    const bubbleDataArray = communityKeywordData.map((keywordData) => {
      const radius = 20 + keywordData.memberCount * 2;
      const circleData = circleContainerRef.current!.addCircle(
        keywordData.keywordId,
        radius,
        keywordData.keywordName,
      );

      return getBubbleData(keywordData, circleData);
    });

    setBubbleDataList(bubbleDataArray);
  }, [communityKeywordData]);

  useEffect(() => {
    if (bubbleDataList.length) {
      animate();
    }
    // 매번 이전 interval을 지우고 새로운 interval로 교체되며 움직임이 빨라지지 않음.
    return () => {
      clearInterval(requestAnimationId.current!);
    };
  }, [bubbleDataList]);

  return (
    <div className={cx('chart-container')}>
      {bubbleDataList.map((bubbleData, index) => (
        <KeywordBubble
          key={index}
          keyword={bubbleData.keyword}
          posX={bubbleData.circle.x}
          posY={bubbleData.circle.y}
          radius={bubbleData.circle.radius}
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
