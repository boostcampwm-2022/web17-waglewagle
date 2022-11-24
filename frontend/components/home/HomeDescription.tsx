import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeDescription.module.scss';
import QuestionProblem from './QuestionProblem';
import QuestionSolution from './QuestionSolution';
import { useEffect, useRef } from 'react';
import useScrollDrawSvg from '@hooks/useScrollDrawSvg';
import useScrollChangeColor from '@hooks/useScrollChangeColor';
const cx = classnames.bind(styles);

const HomeDescription = () => {
  const colorObserver = useScrollChangeColor();
  const svgObserver = useScrollDrawSvg();

  const problemArticleRef = useRef<HTMLElement>(null);
  const problemSvgRef = useRef<SVGSVGElement>(null);
  const solutionArticleRef = useRef<HTMLElement>(null);
  const solutionSvgRef = useRef<SVGSVGElement>(null);
  const manualArticleRef = useRef<HTMLElement>(null);
  const teamArticleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (colorObserver) {
      if (problemArticleRef.current) {
        colorObserver.observe(problemArticleRef.current);
      }
      if (solutionArticleRef.current) {
        colorObserver.observe(solutionArticleRef.current);
      }
      if (manualArticleRef.current) {
        colorObserver.observe(manualArticleRef.current);
      }
      if (teamArticleRef.current) {
        colorObserver.observe(teamArticleRef.current);
      }
    }

    if (svgObserver) {
      if (problemSvgRef.current) {
        svgObserver.observe(problemSvgRef.current);
      }
      if (solutionSvgRef.current) {
        svgObserver.observe(solutionSvgRef.current);
      }
    }

    return () => {
      colorObserver && colorObserver.disconnect();
      svgObserver && svgObserver.disconnect();
    };
  }, [colorObserver, svgObserver]);

  return (
    <section id='description' className={cx('description')}>
      <article className={cx('color-default')} ref={problemArticleRef}>
        <QuestionProblem ref={problemSvgRef} />
        <h3>우리가 느낀 문제점</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
          necessitatibus soluta voluptates unde voluptate! Quibusdam laboriosam
          corrupti eum at autem magni deleniti, amet vero debitis voluptatum
          itaque eligendi fugit vel?
        </p>
      </article>
      <article className={cx('color-default')} ref={solutionArticleRef}>
        <QuestionSolution ref={solutionSvgRef} />
        <h3>와글와글 소개</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quod
          consequuntur quidem molestias totam reiciendis iste at repellat. Cum
          esse quae fugit in possimus ipsam molestiae impedit recusandae
          accusamus nisi.
        </p>
      </article>
      <article className={cx('color-default')} ref={manualArticleRef}>
        <h3>와글와글 사용법</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In tenetur
          tempore, nulla numquam molestiae quae accusantium reiciendis, illum
          doloribus deserunt magnam animi sapiente adipisci temporibus, minus
          odit. Culpa, nostrum repellendus.
        </p>
      </article>
      <article className={cx('color-default')} ref={teamArticleRef}>
        <h3>팀 소개</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quod
          consequuntur quidem molestias totam reiciendis iste at repellat. Cum
          esse quae fugit in possimus ipsam molestiae impedit recusandae
          accusamus nisi.
        </p>
      </article>
    </section>
  );
};

export default HomeDescription;
