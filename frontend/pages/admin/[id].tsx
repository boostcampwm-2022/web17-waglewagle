import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  AdminLayout,
  AdminMain,
  AdminSideBar,
  KeywordControl,
  UserControl,
} from '@components/admin';
import { ADMIN_PAGE_TAB } from '@constants/constants';
import SeoHead from '@components/common/Head';
import config from '../../config';

const Admin = () => {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const title = '부스트캠프 7기 커뮤니티';

  const handleClickTab = (tabData: number) => {
    setTab(tabData);
  };

  return (
    <AdminLayout>
      <SeoHead
        title='와글와글 | 관리자 페이지'
        description='데이터 시각화를 통한 중규모 커뮤니티 소모임 관리 서비스'
        url={`${config.HOST}${router.asPath}`}
      />
      <AdminSideBar title={title} handleClickTab={handleClickTab} tab={tab} />
      <AdminMain title={title} tab={tab}>
        {tab === ADMIN_PAGE_TAB.USER_CONTROL ? (
          <UserControl />
        ) : (
          <KeywordControl />
        )}
      </AdminMain>
    </AdminLayout>
  );
};

export default Admin;
