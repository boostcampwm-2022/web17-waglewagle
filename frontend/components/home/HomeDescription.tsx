import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeDescription.module.scss';
import QuestionProblem from './QuestionProblem';
import QuestionSolution from './QuestionSolution';
import { useEffect, useRef } from 'react';
import useScrollDrawSvg from '@hooks/useScrollDrawSvg';
import useScrollChangeColor from '@hooks/useScrollChangeColor';
const cx = classnames.bind(styles);

const HomeDescription = () => {
  const pageRef = useRef<number>(0);
  const colorObserver = useScrollChangeColor();
  const svgObserver = useScrollDrawSvg();

  const problemArticleRef = useRef<HTMLElement>(null);
  const problemSvgRef = useRef<SVGSVGElement>(null);
  const solutionArticleRef = useRef<HTMLElement>(null);
  const solutionSvgRef = useRef<SVGSVGElement>(null);
  const manualArticleRef = useRef<HTMLElement>(null);
  const teamArticleRef = useRef<HTMLElement>(null);

  const moveSectionScroll = (e: WheelEvent) => {
    e.preventDefault();
    // 아래 스크롤
    if (e.deltaY > 0 && pageRef.current < 4) {
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
        <h3 className={cx('description-title')}>우리가 느낀 문제점</h3>
        <p className={cx('description-paragraph')}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
          necessitatibus soluta voluptates unde voluptate! Quibusdam laboriosam
          corrupti eum at autem magni deleniti, amet vero debitis voluptatum
          itaque eligendi fugit vel?
        </p>
      </article>
      <article className={cx('color-default')} ref={solutionArticleRef}>
        <QuestionSolution ref={solutionSvgRef} />
        <h3 className={cx('description-title')}>와글와글 소개</h3>
        <p className={cx('description-paragraph')}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quod
          consequuntur quidem molestias totam reiciendis iste at repellat. Cum
          esse quae fugit in possimus ipsam molestiae impedit recusandae
          accusamus nisi.
        </p>
      </article>
      <article className={cx('color-default')} ref={manualArticleRef}>
        <h3 className={cx('description-title')}>와글와글 사용법</h3>
        <p className={cx('description-paragraph')}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In tenetur
          tempore, nulla numquam molestiae quae accusantium reiciendis, illum
          doloribus deserunt magnam animi sapiente adipisci temporibus, minus
          odit. Culpa, nostrum repellendus.
        </p>
      </article>
      <article className={cx('color-default')} ref={teamArticleRef}>
        <h3 className={cx('description-title')}>팀 소개</h3>
        <p className={cx('description-paragraph')}>
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
