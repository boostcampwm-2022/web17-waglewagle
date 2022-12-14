import styles from '@sass/components/home/HomeMainLayout.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface HomeMainLayoutProps {
  children: React.ReactNode;
}

const HomeMainLayout = ({ children }: HomeMainLayoutProps) => {
  return <main className={cx('main')}>{children}</main>;
};

export default HomeMainLayout;
