import { useEffect, useRef, useState } from 'react';
import { BubbleData, KeywordData } from '../../types/types';
import KeywordBubble from './KeywordBubble';
import CircleContainer from '../../circlepacker/CircleContainer';
import Circle from '../../circlepacker/Circle';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import useKeywordListQuery from '@hooks/useKeywordListQuery';
import styles from '@sass/components/community/KeywordBubbleChart.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const KeywordBubbleChart = () => {
  const router = useRouter();
  const communityId: string = router.query.id as string;
  const [bubbleDataList, setBubbleDataList] = useState<BubbleData[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const [_, setIsMove] = useState<boolean>(false);
  const requestAnimationId = useRef<number>(0);
  const circleContainerRef = useRef<CircleContainer | null>(null);
  const fetchedKeywordData = useKeywordListQuery(communityId);
  // 여기에서는 slice된 keywordData를 가지고 있기 때문에 fetched와 별도의 상태로 관리됨.
  const [slicedCommunityKeywordData, setSlicedCommunityKeywordData] = useState<
    KeywordData[]
  >([]);

  const getBubbleData = (keywordData: KeywordData, circleData: Circle) => {
    return {
      keyword: keywordData.keywordName,
      count: keywordData.memberCount,
      circle: circleData,
    };
  };

  const animate = () => {
    const update = () => {
      circleContainerRef.current?.update();

      const ctx = canvasRef.current?.getContext('2d');
      ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (!circleContainerRef.current?.circles) {
        return;
      }

      const circleKeys: string[] = Object.keys(
        circleContainerRef.current?.circles,
      );

      circleKeys.forEach((circleId) => {
        const circle = circleContainerRef.current?.circles[circleId];
        ctx?.beginPath();
        ctx?.arc(circle!.x, circle!.y, circle!.radius, 0, 360);
        ctx!.fillStyle = '#133d59';
        ctx?.stroke();
        ctx?.fill();
        ctx!.font = `${10 + circle!.radius * 1}px Nanum BugGeugSeong`;
        ctx!.fillStyle = '#fcfcfc';
        ctx?.fillText(circle!.innerText, circle!.x, circle!.y);
      });

      requestAnimationId.current = requestAnimationFrame(update);
    };

    requestAnimationId.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (!fetchedKeywordData) {
      return;
    }
    const slicedData = fetchedKeywordData.slice(0, 30);
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
      const radius = 20 + keywordData.memberCount * 2;
      const circleData = circleContainerRef.current!.addCircle(
        keywordData.keywordId,
        radius,
        keywordData.keywordName,
      );

      return getBubbleData(keywordData, circleData);
    });

    setBubbleDataList(bubbleDataArray);
  }, [slicedCommunityKeywordData]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    animate();

    return () => {
      cancelAnimationFrame(requestAnimationId.current!);
    };
  }, [bubbleDataList]);

  return (
    <canvas ref={canvasRef} />
    // <div className={cx('chart-container')}>
    //   {bubbleDataList.map((bubbleData, index) => (
    //     <KeywordBubble
    //       key={index}
    //       keyword={bubbleData.keyword}
    //       posX={bubbleData.circle.x}
    //       posY={bubbleData.circle.y}
    //       radius={bubbleData.circle.radius}
    //     />
    //   ))}
    // </div>
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
