import { useRef, useEffect } from 'react';

const useSectionScroll = (maxPage: number) => {
  const pageRef = useRef<number>(0);

  const moveSectionScroll = (e: WheelEvent) => {
    e.preventDefault();
    // 아래 스크롤
    if (e.deltaY > 0 && pageRef.current < maxPage) {
      pageRef.current += 1;
    }
    if (e.deltaY < 0 && pageRef.current > 0) {
      pageRef.current -= 1;
    }

    window.scrollTo(0, pageRef.current * window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('wheel', moveSectionScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', moveSectionScroll);
    };
  }, []);
};

export default useSectionScroll;
