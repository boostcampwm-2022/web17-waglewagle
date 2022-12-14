import { ReactNode } from 'react';
import styles from '@sass/components/admin/AdminLayout.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <div className={cx('layout')}>{children}</div>;
};

export default AdminLayout;
