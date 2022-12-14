import { useEffect, useMemo, useRef } from 'react';
import throttle from '@utils/throttle';

const useSectionScroll = (maxPage: number) => {
  const pageRef = useRef<number>(0); // page에 따라 불필요한 리렌더링이 발생하지 않게하기위해 ref 사용

  // eslint가 useCallback에
  const moveSectionScroll = useMemo(
    () =>
      throttle((e: WheelEvent) => {
        e.preventDefault();
        // 아래 스크롤

        if (e.deltaY > 0 && pageRef.current < maxPage) {
          pageRef.current += 1;
        }
        if (e.deltaY < 0 && pageRef.current > 0) {
          pageRef.current -= 1;
        }

        window.scrollTo(0, pageRef.current * window.innerHeight);
      }, 500),
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
