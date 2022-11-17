import { ADMIN_PAGE_TAB } from '../../constants/constants';

interface AdminSidebarProps {
  title: string;
  handleClickTab: (tabData: number) => void;
}

const AdminSideBar = ({ title, handleClickTab }: AdminSidebarProps) => {
  return (
    <aside>
      <h2>{title}</h2>
      <ul>
        <li
          onClick={() => {
            handleClickTab(ADMIN_PAGE_TAB.USER_CONTROL);
          }}
        >
          유저 관리
        </li>
        <li
          onClick={() => {
            handleClickTab(ADMIN_PAGE_TAB.KEYWORD_CONTROL);
          }}
        >
          키워드 관리
        </li>
      </ul>
    </aside>
  );
};

export default AdminSideBar;
