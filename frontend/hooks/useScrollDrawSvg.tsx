import { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import drawSVG from '@utils/drawSVG';
import styles from '@sass/components/home/HomeDescription.module.scss';
const cx = classnames.bind(styles);

interface IntersectionObserverOption {
  root?: Element | Document;
  rootMargin?: string;
  threshold?: number;
}

const useScrollDrawSvg = () => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const scrollDrawSvg = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(cx('svg-active'));
        // entry의 type은 IntersectionObserverEntry로 generic이 아니다.
        // entry.target의 기본 type은 Element로, SVGSVGElement와 호환되지 않는다고 한다.
        // TODO : 여기서 as를 지울 수 있는 방법이 있을까?
        drawSVG(entry.target as SVGSVGElement);
      } else {
        entry.target.classList.remove(cx('svg-active'));
      }
    });
  };

  useEffect(() => {
    const option: IntersectionObserverOption = {
      threshold: 0.5,
    };

    const colorObserver = new IntersectionObserver(scrollDrawSvg, option);
    setObserver(colorObserver);
  }, []);

  return observer;
};

export default useScrollDrawSvg;
