import classnames from 'classnames/bind';
import { ADMIN_PAGE_TAB } from '@constants/constants';
import styles from '@sass/components/admin/AdminSidebar.module.scss';
const cx = classnames.bind(styles);

interface AdminSidebarProps {
  tab: number;
  title: string;
  handleClickTab: (tabData: number) => void;
}

const AdminSideBar = ({ tab, title, handleClickTab }: AdminSidebarProps) => {
  return (
    <aside className={cx('sidebar')}>
      <h2>{title}</h2>
      <ul>
        <li
          className={cx({ active: tab === ADMIN_PAGE_TAB.KEYWORD_CONTROL })}
          onClick={() => {
            handleClickTab(ADMIN_PAGE_TAB.KEYWORD_CONTROL);
          }}
        >
          키워드 관리
        </li>
        <li
          className={cx({ active: tab === ADMIN_PAGE_TAB.USER_CONTROL })}
          onClick={() => {
            handleClickTab(ADMIN_PAGE_TAB.USER_CONTROL);
          }}
        >
          유저 관리
        </li>
      </ul>
    </aside>
  );
};

export default AdminSideBar;
