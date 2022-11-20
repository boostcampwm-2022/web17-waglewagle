import { useEffect, useRef } from 'react';
import QuestionProblem from './QuestionProblem';
import { INTERSECT_TYPES } from '@constants/constants';
// @hooks라는 alias가 자꾸 오류가 남.
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeArticle.module.scss';
const cx = classnames.bind(styles);

const HomeProblem = () => {
  const articleRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // 현재는 중복되는 코드가 많아보이지만, 이후 수정되면 변경될 예정 패럴랙스와 스크롤 이벤트 적용을 위해서 중복으로 작성해둠.
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
      <QuestionProblem ref={svgRef} />
      <h3>우리가 느낀 문제점</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
        necessitatibus soluta voluptates unde voluptate! Quibusdam laboriosam
        corrupti eum at autem magni deleniti, amet vero debitis voluptatum
        itaque eligendi fugit vel?
      </p>
    </article>
  );
};

export default HomeProblem;
