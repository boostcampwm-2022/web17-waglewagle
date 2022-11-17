import chevronDownIcon from '@public/images/chevron-down.svg';
import Image from 'next/image';
import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeChevronDown.module.scss';
const cx = classnames.bind(styles);

const HomeChevronDown = () => {
  return (
    <a className={cx('chevron--description')} href='#description'>
      <Image
        src={chevronDownIcon}
        width={20}
        height={20}
        alt='아랫방향 화살표'
      />
    </a>
  );
};
1;

export default HomeChevronDown;
