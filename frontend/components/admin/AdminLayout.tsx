import classnames from 'classnames/bind';
import styles from '@sass/components/admin/AdminLayout.module.scss';
const cx = classnames.bind(styles);

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <div className={cx('layout')}>{children}</div>;
};

export default AdminLayout;
