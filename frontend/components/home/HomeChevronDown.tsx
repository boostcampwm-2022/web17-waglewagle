import ChevronDownIcon from '@public/images/chevron-down.svg';
import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeChevronDown.module.scss';
const cx = classnames.bind(styles);

const HomeChevronDown = () => {
  return (
    <a className={cx('chevron--description')} href='#description'>
      <ChevronDownIcon />
    </a>
  );
};
1;

export default HomeChevronDown;
