import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeDescription.module.scss';
const cx = classnames.bind(styles);
import { useEffect, useState } from 'react';

interface IntersectionObserverOption {
  root?: Element | Document;
  rootMargin?: string;
  threshold?: number;
}

const useScrollChangeOpacity = () => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const changeOpacity = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 이후에는 다양하게
        entry.target.classList.add(cx('opacity-changed'));
      } else {
        entry.target.classList.remove(cx('opacity-changed'));
      }
    });
  };

  useEffect(() => {
    const option: IntersectionObserverOption = {
      threshold: 0.8,
    };

    const opacityObserver = new IntersectionObserver(changeOpacity, option);
    setObserver(opacityObserver);
  }, []);

  return observer;
};

export default useScrollChangeOpacity;
