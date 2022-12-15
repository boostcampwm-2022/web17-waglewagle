import { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeDescription.module.scss';
const cx = classnames.bind(styles);

interface IntersectionObserverOption {
  root?: Element | Document;
  rootMargin?: string;
  threshold?: number;
}

const useScrollChangeOpacity = (delay: number) => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const changeOpacity = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 이후에는 다양하게
          setTimeout(() => {
            entry.target.classList.add(cx('opacity-changed'));
          }, delay);
        } else {
          entry.target.classList.remove(cx('opacity-changed'));
        }
      });
    },
    [delay],
  );

  useEffect(() => {
    if (changeOpacity) {
      const option: IntersectionObserverOption = {
        threshold: 0.8,
      };

      const opacityObserver = new IntersectionObserver(changeOpacity, option);
      setObserver(opacityObserver);
    }
  }, [changeOpacity]);

  return observer;
};

export default useScrollChangeOpacity;
