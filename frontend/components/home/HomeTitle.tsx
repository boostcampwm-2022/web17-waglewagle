import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeTitle.module.scss';
const cx = classnames.bind(styles);

const HomeTitle = () => {
  return <h1 className={cx('title')}>개쩌는 와글와글 앱</h1>;
};

export default HomeTitle;
