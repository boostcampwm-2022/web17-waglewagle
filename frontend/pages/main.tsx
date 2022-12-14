import { useEffect } from 'react';
import { useRouter } from 'next/router';
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
import config from '../config';

const Main = () => {
  const router = useRouter();
  const userData = useUserMe();

  useEffect(() => {
    // try / catch로 depth가 깊어져서 ealry return
    if (!userData) {
      router.push('/');
      return;
    }

    try {
      apis.user.joinCommunity(MVP_DEFAULT.COMMUNITY_ID);
    } catch (e) {
      alert('알 수 없는 에러가 발생했습니다.');
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
