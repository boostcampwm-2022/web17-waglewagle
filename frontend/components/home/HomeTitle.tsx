import styles from '@sass/components/home/HomeTitle.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const HomeTitle = () => {
  return <h1 className={cx('title')}>와글와글</h1>;
};

export default HomeTitle;
