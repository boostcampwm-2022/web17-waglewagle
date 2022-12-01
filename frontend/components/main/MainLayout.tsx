import classnames from 'classnames/bind';
import styles from '@sass/components/main/MainLayout.module.scss';
const cx = classnames.bind(styles);

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <div className={cx('layout')}>{children}</div>;
};

export default MainLayout;
