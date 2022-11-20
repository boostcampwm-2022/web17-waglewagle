import { INTERSECT_TYPES } from '@constants/constants';
import { useEffect, useRef } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeArticle.module.scss';
import QuestionSolution from './QuestionSolution';
const cx = classnames.bind(styles);

const HomeProjectIntroduction = () => {
  const articleRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

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

    const svgObserver = useIntersectionObserver(
      INTERSECT_TYPES.DRAW_SVG,
      option,
    );
    if (svgRef.current) {
      svgObserver.observe(svgRef.current);
    }

    return () => {
      colorObserver && colorObserver.disconnect();
      svgObserver && svgObserver.disconnect();
    };
  }, []);
  return (
    <article className={cx('color-default')} ref={articleRef}>
      <QuestionSolution ref={svgRef} />
      <h3>와글와글 소개</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quod
        consequuntur quidem molestias totam reiciendis iste at repellat. Cum
        esse quae fugit in possimus ipsam molestiae impedit recusandae accusamus
        nisi.
      </p>
    </article>
  );
};

export default HomeProjectIntroduction;
