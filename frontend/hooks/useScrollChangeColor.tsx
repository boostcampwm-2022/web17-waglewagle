import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeDescription.module.scss';
const cx = classnames.bind(styles);
import { useEffect, useState } from 'react';

interface IntersectionObserverOption {
  root?: Element | Document;
  rootMargin?: string;
  threshold?: number;
}

const useScrollChangeColor = () => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const changeColor = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 이후에는 다양하게
        entry.target.classList.add(cx('color-changed'));
      } else {
        entry.target.classList.remove(cx('color-changed'));
      }
    });
  };

  useEffect(() => {
    const option: IntersectionObserverOption = {
      threshold: 0.5,
    };

    const colorObserver = new IntersectionObserver(changeColor, option);
    setObserver(colorObserver);
  }, []);

  return observer;
};

export default useScrollChangeColor;
