import classnames from 'classnames/bind';
import styles from '@sass/components/admin/AdminLayout.module.scss';
import { ReactNode } from 'react';
const cx = classnames.bind(styles);

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <div className={cx('layout')}>{children}</div>;
};

export default AdminLayout;
