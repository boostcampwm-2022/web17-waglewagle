import { useEffect, useRef } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { INTERSECT_TYPES } from '@constants/constants';
import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeArticle.module.scss';
const cx = classnames.bind(styles);

const HomeManual = () => {
  const articleRef = useRef<HTMLElement>(null);

  const option = {
    threshold: 0.5,
  };

  useEffect(() => {
    const colorObserver = useIntersectionObserver(
      INTERSECT_TYPES.CHANGE_COLOR,
      option,
    );

    if (articleRef.current) {
      colorObserver.observe(articleRef.current);
    }

    return () => {
      colorObserver && colorObserver.disconnect();
    };
  }, []);
  return (
    <article className={cx('color-default')} ref={articleRef}>
      <h3>와글와글 사용법</h3>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. In tenetur
        tempore, nulla numquam molestiae quae accusantium reiciendis, illum
        doloribus deserunt magnam animi sapiente adipisci temporibus, minus
        odit. Culpa, nostrum repellendus.
      </p>
    </article>
  );
};

export default HomeManual;
