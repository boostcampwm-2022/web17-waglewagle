import { useEffect, useRef } from 'react';
import { INTERSECT_TYPES } from '@constants/constants';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeArticle.module.scss';
const cx = classnames.bind(styles);

const HomeTeamIntroduction = () => {
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
      <h3>팀 소개</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quod
        consequuntur quidem molestias totam reiciendis iste at repellat. Cum
        esse quae fugit in possimus ipsam molestiae impedit recusandae accusamus
        nisi.
      </p>
    </article>
  );
};

export default HomeTeamIntroduction;
