import classnames from 'classnames/bind';
import ChevronDownIcon from '@public/images/icons/chevron-down.svg';
import styles from '@sass/components/home/HomeChevronDown.module.scss';
const cx = classnames.bind(styles);

const HomeChevronDown = () => {
  const handleClick = () => {
    // 아래로 스크롤하는 이벤트 발생
    const event = new WheelEvent('wheel', { deltaY: 100 });
    window.dispatchEvent(event);
  };
  return (
    <a onClick={handleClick} className={cx('chevron--description')}>
      <ChevronDownIcon />
    </a>
  );
};
1;

export default HomeChevronDown;
