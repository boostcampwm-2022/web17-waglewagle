import { ADMIN_PAGE_TAB } from '@constants/constants';
import styles from '@sass/components/admin/AdminMain.module.scss';
import classnames from 'classnames/bind';
import { ReactNode } from 'react';
const cx = classnames.bind(styles);

interface AdminMainProps {
  title: string;
  tab: number;
  children: ReactNode;
}

const AdminMain = ({ title, tab, children }: AdminMainProps) => {
  return (
    <main className={cx('main')}>
      <header>
        <h3>
          {title} {tab === ADMIN_PAGE_TAB.KEYWORD_CONTROL ? '키워드' : '유저'}{' '}
          관리
        </h3>
      </header>
      <section>{children}</section>
    </main>
  );
};

export default AdminMain;
