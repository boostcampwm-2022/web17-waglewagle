import { apis } from '@apis/index';
import { Loading } from '@components/common';
import SeoHead from '@components/common/Head';
import {
  CommunityList,
  MainHeader,
  MainLayout,
  MainTitle,
} from '@components/main';
import { MVP_DEFAULT } from '@constants/constants';
import useUserMe from '@hooks/useUserMe';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import config from '../config';

const Main = () => {
  const router = useRouter();
  const userData = useUserMe();

  useEffect(() => {
    if (userData) {
      apis.user.joinCommunity(MVP_DEFAULT.COMMUNITY_ID);
    } else {
      router.push('/');
    }
  }, [router, userData]);

  if (!userData) {
    return <Loading />;
  }

  return (
    <MainLayout>
      <SeoHead
        title='와글와글 | 메인'
        description='데이터 시각화를 통한 중규모 커뮤니티 소모임 관리 서비스'
        url={`${config.HOST}${router.asPath}`}
      />
      <MainHeader />
      <MainTitle username={userData.username} />
      <CommunityList />
    </MainLayout>
  );
};

export default Main;
