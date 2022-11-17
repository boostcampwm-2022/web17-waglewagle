import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeTitle.module.scss';
const cx = classnames.bind(styles);

const HomeTitle = () => {
  return <h1 className={cx('title')}>와글와글</h1>;
};

export default HomeTitle;
