import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeMainLayout.module.scss';
const cx = classnames.bind(styles);

interface HomeMainLayoutProps {
  children: React.ReactNode;
}

const HomeMainLayout = ({ children }: HomeMainLayoutProps) => {
  return <main className={cx('main')}>{children}</main>;
};

export default HomeMainLayout;
