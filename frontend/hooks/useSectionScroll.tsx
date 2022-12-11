import { useCallback } from 'react';
import { useRef, useEffect } from 'react';

const useSectionScroll = (maxPage: number) => {
  const pageRef = useRef<number>(0); // page에 따라 불필요한 리렌더링이 발생하지 않게하기위해 ref 사용

  const moveSectionScroll = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      // 아래 스크롤
      if (e.deltaY > 0 && pageRef.current < maxPage) {
        pageRef.current += 1;
      }
      if (e.deltaY < 0 && pageRef.current > 0) {
        pageRef.current -= 1;
      }

      window.scrollTo(0, pageRef.current * window.innerHeight);
    },
    [maxPage],
  );

  useEffect(() => {
    window.addEventListener('wheel', moveSectionScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', moveSectionScroll);
    };
  }, [moveSectionScroll]);

  return pageRef;
};

export default useSectionScroll;
