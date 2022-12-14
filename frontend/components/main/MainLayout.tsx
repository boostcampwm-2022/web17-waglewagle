import styles from '@sass/components/main/MainLayout.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <div className={cx('layout')}>{children}</div>;
};

export default MainLayout;
