import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import classnames from 'classnames/bind';
import IntroduceTeam from '@components/common/svg/IntroduceTeam';
import QuestionProblem from '@components/common/svg/QuestionProblem';
import QuestionSolution from '@components/common/svg/QuestionSolution';
import useScrollChangeColor from '@hooks/useScrollChangeOpacity';
import useScrollDrawSvg from '@hooks/useScrollDrawSvg';
import useSectionScroll from '@hooks/useSectionScroll';
import IntroduceProduct from '../common/svg/IntroduceProduct';
import styles from '@sass/components/home/HomeDescription.module.scss';
const cx = classnames.bind(styles);

const HomeDescription = () => {
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const pageRef = useSectionScroll(4); // 최대 페이지를 넣어주면 섹션별로 움직이도록
  const instantOpacityObserver = useScrollChangeColor(0);
  const svgObserver = useScrollDrawSvg();

  const problemArticleRef = useRef<HTMLElement>(null);
  const solutionArticleRef = useRef<HTMLElement>(null);
  const manualArticleRef = useRef<HTMLElement>(null);
  const teamArticleRef = useRef<HTMLElement>(null);
  const drawingManRef = useRef<HTMLImageElement>(null);

  const problemSvgRef = useRef<SVGSVGElement>(null);
  const solutionSvgRef = useRef<SVGSVGElement>(null);
  const productSvgRef = useRef<SVGSVGElement>(null);
  const teamSvgRef = useRef<SVGSVGElement>(null);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  const handleResize = () => {
    setInnerHeight(window.innerHeight);
  };

  const handleClickUp: MouseEventHandler = () => {
    pageRef.current = 0;
    window.scrollTo(0, pageRef.current * window.innerHeight);
  };

  useEffect(() => {
    setInnerHeight(window.innerHeight);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (instantOpacityObserver) {
      if (problemArticleRef.current) {
        instantOpacityObserver.observe(problemArticleRef.current);
      }
      if (solutionArticleRef.current) {
        instantOpacityObserver.observe(solutionArticleRef.current);
      }
      if (manualArticleRef.current) {
        instantOpacityObserver.observe(manualArticleRef.current);
      }
      if (teamArticleRef.current) {
        instantOpacityObserver.observe(teamArticleRef.current);
      }
    }

    return () => {
      instantOpacityObserver && instantOpacityObserver.disconnect();
    };
  }, [instantOpacityObserver]);

  useEffect(() => {
    if (svgObserver) {
      if (problemSvgRef.current) {
        svgObserver.observe(problemSvgRef.current);
      }
      if (solutionSvgRef.current) {
        svgObserver.observe(solutionSvgRef.current);
      }
      if (productSvgRef.current) {
        svgObserver.observe(productSvgRef.current);
      }
      if (teamSvgRef.current) {
        svgObserver.observe(teamSvgRef.current);
      }
    }

    return () => {
      svgObserver && svgObserver.disconnect();
    };
  }, [svgObserver]);

  return (
    <section id='description' className={cx('description')}>
      <article className={cx('description-article')} ref={problemArticleRef}>
        <QuestionProblem ref={problemSvgRef} />
        <Image
          className={cx('parallex-image', 'thinking-image')}
          src='/images/parallax/thinking.png'
          style={{
            transform: `translateY(${offsetY * 0.5 - innerHeight * 0.5}px)`,
          }}
          width={256}
          height={238}
          alt='고민하는 사람 그림'
        />
        <h3 className={cx('description-title')}>우리가 느낀 문제점</h3>
        <p className={cx('description-paragraph')}>
          새로운 커뮤니티에 들어가면, 거기에 어떤 사람들이 있는지 궁금합니다.
          어떤 사람들이 어떤 관심사를 가지고 있는지 궁금합니다. 누군가는 여러
          개의 채널을 만들어서 관심사를 공유 할 수도, 누군가는 이벤트를 열어서
          관심사를 나누고 친해질 수도 있겠습니다. 나와 같은 관심사를 가진 사람을
          알아가는 것은 좋지만, 그 과정이 불편하면 알아갈 기회가 적어졌습니다.
        </p>
        <p className={cx('description-paragraph')}>
          나와 같은 관심사를 가진 사람을 알아가고 싶지만, 그 과정이 불편하면
          알아갈 기회가 적어졌습니다. 접근성 개선이 필요했습니다.
        </p>
        <p className={cx('description-paragraph')}>
          어쩌면 우리에게는 관심사 접근성 개선이 필요했습니다.
        </p>
      </article>
      <article className={cx('description-article')} ref={solutionArticleRef}>
        <QuestionSolution ref={solutionSvgRef} />
        <Image
          className={cx('parallex-image', 'friendly-image')}
          src='/images/parallax/friendly.png'
          style={{
            transform: `translateY(${offsetY * 0.5 - innerHeight}px)`,
          }}
          width={256}
          height={238}
          alt='친구끼리 장난치는 그림'
        />
        <h3 className={cx('description-title')}>
          커뮤니티 내, 관심 키워드 시각화 서비스
        </h3>
        <p className={cx('description-paragraph')}>
          와글와글은 커뮤니티 내의 관심사 키워드들을 쉽게 볼 수 있도록 원으로
          보여줍니다. 얼마나 많은 사람들이 참여했는지에 따라서 크기가
          달라집니다.
        </p>
        <p className={cx('description-paragraph')}>
          우리 커뮤니티에는 어떤 키워드가 가장 와글와글 할까요?
        </p>
      </article>
      <article className={cx('description-article')} ref={manualArticleRef}>
        <IntroduceProduct ref={productSvgRef} />
        <span className={cx('doodle-by-man')}>슈붕이 최고야</span>
        <h3 className={cx('description-title')}>와글와글 사용법</h3>
        <p className={cx('description-paragraph')}>
          커뮤니티에 들어가셨다면, 나를 표현해줄 키워드를 골라보세요. 어떤
          키워드라도 괜찮습니다. 다만 내 관심사에 다른 사람들도 함께하길
          원한다면, 간단하고 읽기 좋은 키워드로 표현해주시는 것이 좋습니다.
        </p>
        <p className={cx('description-paragraph')}>
          관심사 키워드를 추가하셨다면, 우리 커뮤니티에는 어떤 키워드가 있는지
          둘러보세요! 키워드에 입장하시면 다른 구성원들이 어떤 이야기를 나누고
          있는지도 알아볼 수 있을거에요.
        </p>
        <p className={cx('description-paragraph')}>해치지 않아요. 🐕</p>
      </article>
      <article className={cx('description-article')} ref={teamArticleRef}>
        <IntroduceTeam ref={teamSvgRef} />
        <span className={cx('doodle-by-man')}>
          우리는 아직 정의되지 않았습니다.
        </span>
        <h3 className={cx('description-title')}></h3>
        <p className={cx('description-paragraph')}>
          <a href='https://github.com/boostcampwm-2022/web17-waglewagle/wiki'>
            <i>
              <b>팀 undefined 위키 보러가기</b>
            </i>
          </a>
          <br />
          👑 우리 모두가 리더다. <br />
          ❓ 기술적인 도전이란 무엇인가? <br />
          🙇 프로젝트 리더 ‘죄송합니다’ 금지 <br />
          🙇‍♂️ 프로젝트 리더에게 ‘죄송합니다’ 금지 <br />
        </p>
        <p className={cx('description-paragraph')}>
          ☎팀 언ㄷㅣ❉ㅍr인드★ ⚀성황zㅣ 상영중! <br />
          우ㅣㅋㅣ 방문 □ㅐ우 환영!♚
        </p>
        <button className={cx('go-back-button')} onClick={handleClickUp}>
          처음으로 돌아가기
        </button>
      </article>
      <Image
        ref={drawingManRef}
        className={cx('parallex-image', 'drawing-man-image', {
          showing: offsetY > innerHeight * 3,
        })}
        src='/images/parallax/drawing-man.png'
        width={128}
        height={259}
        alt='그림 그리는 남자 그림'
      />
    </section>
  );
};

export default HomeDescription;
