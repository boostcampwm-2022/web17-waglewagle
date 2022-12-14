import styles from '@sass/components/home/HomeLayout.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return <div className={cx('layout')}>{children}</div>;
};

export default HomeLayout;
