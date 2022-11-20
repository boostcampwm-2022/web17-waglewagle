import { INTERSECT_TYPES } from '../constants/constants';
import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeArticle.module.scss';
const cx = classnames.bind(styles);
import drawSVG from '@utils/drawSVG';

interface IntersectionObserverOption {
  root?: Element | Document;
  rootMargin?: string;
  threshold?: number;
}

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

const drawSvg = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add(cx('svg-active'));
      // entry의 type은 IntersectionObserverEntry로 generic이 아니다.
      // entry.target의 기본 type은 Element로, SVGSVGElement와 호환되지 않는다고 한다.
      // TODO : 여기서 as를 지울 수 있는 방법이 있을까?
      drawSVG(entry.target as SVGSVGElement);
    } else {
      entry.target.classList.remove(cx('svg-active'));
    }
  });
};

const intersectionHandler: Record<
  string,
  (entries: IntersectionObserverEntry[]) => void
> = {
  CHANGE_COLOR: changeColor,
  DRAW_SVG: drawSvg,
};

const observer: Record<string, IntersectionObserver> = {};

// SVGSVGElemnt와 HTMLElement의 타입을 호환시키며 하나의 함수나 객체로 관리하기 어려워서 각각으로 분리함.
// TODO : 하나의 Custom Hook으로 붙일 방법이 있을까?
const useIntersectionObserver = (
  type: INTERSECT_TYPES,
  option?: IntersectionObserverOption,
): IntersectionObserver => {
  // 겹치는 애니메이션이 나타나면, 다른 개체의 효과는 취소하여 다시 해당 섹션으로 진입했을 때 애니메이션을 다시 재생할 수 있도록 observer를 하나로 관리한다.
  if (!observer[type]) {
    observer[type] = new IntersectionObserver(
      intersectionHandler[type],
      option,
    );
  }

  return observer[type];
};

export default useIntersectionObserver;
