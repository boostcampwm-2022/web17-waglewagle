import { ADMIN_PAGE_TAB } from '../../constants/constants';
import classnames from 'classnames/bind';
import styles from '@sass/components/admin/AdminMain.module.scss';
const cx = classnames.bind(styles);

interface AdminMainProps {
  title: string;
  tab: number;
  children: React.ReactNode;
}

const AdminMain = ({ title, tab, children }: AdminMainProps) => {
  return (
    <main className={cx('main')}>
      <header>
        <h3>
          {title} {tab === ADMIN_PAGE_TAB.USER_CONTROL ? '유저' : '키워드'} 관리
        </h3>
      </header>
      <section>{children}</section>
    </main>
  );
};

export default AdminMain;
