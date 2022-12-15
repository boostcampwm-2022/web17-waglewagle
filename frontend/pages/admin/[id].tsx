import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  AdminLayout,
  AdminMain,
  AdminSideBar,
  KeywordControl,
  UserControl,
} from '@components/admin';
import { Loading } from '@components/common';
import SeoHead from '@components/common/Head';
import { ADMIN_PAGE_TAB } from '@constants/constants';
import useUserMe from '@hooks/useUserMe';
import config from '../../config';

const Admin = () => {
  const router = useRouter();
  const communityId = router.query.id as string;
  const [tab, setTab] = useState(0);
  const title = '부스트캠프 7기 커뮤니티';

  const userData = useUserMe(communityId);

  const handleClickTab = (tabData: number) => {
    setTab(tabData);
  };

  useEffect(() => {
    // 조건문이 길어져서 ealry return 사용
    if (!router.isReady) {
      return;
    }

    if (userData && userData.role !== 'ADMIN' && userData.role !== 'MANAGER') {
      alert('권한이 없습니다.');
      router.push('/main');
    }
  }, [userData, router]);

  if (!userData) {
    return <Loading />;
  }

  return (
    <AdminLayout>
      <SeoHead
        title='와글와글 | 관리자 페이지'
        description='데이터 시각화를 통한 중규모 커뮤니티 소모임 관리 서비스'
        url={`${config.HOST}${router.asPath}`}
      />
      <AdminSideBar title={title} handleClickTab={handleClickTab} tab={tab} />
      <AdminMain title={title} tab={tab}>
        {tab === ADMIN_PAGE_TAB.KEYWORD_CONTROL ? (
          <KeywordControl />
        ) : (
          <UserControl />
        )}
      </AdminMain>
    </AdminLayout>
  );
};

export default Admin;
