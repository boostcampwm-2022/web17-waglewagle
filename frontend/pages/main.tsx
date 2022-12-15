import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loading } from '@components/common';
import SeoHead from '@components/common/Head';
import {
  CommunityList,
  MainHeader,
  MainLayout,
  MainTitle,
} from '@components/main';
import useUserMe from '@hooks/useUserMe';
import useJoinBoostcampCommunity from '@hooks/useJoinBoostcampCommunity';
import config from '../config';

const Main = () => {
  const router = useRouter();
  const userData = useUserMe();
  useJoinBoostcampCommunity();

  useEffect(() => {
    if (!userData) {
      router.push('/');
      return;
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
