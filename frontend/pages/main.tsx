import SeoHead from '@components/common/Head';
import {
  CommunityList,
  MainHeader,
  MainLayout,
  MainTitle,
} from '@components/main';
import { useRouter } from 'next/router';
import { useState } from 'react';
import config from '../config';

const Main = () => {
  const router = useRouter();
  const [username] = useState('커넥트재단');

  return (
    <MainLayout>
      <SeoHead
        title='와글와글 | 메인'
        description='데이터 시각화를 통한 중규모 커뮤니티 소모임 관리 서비스'
        url={`${config.HOST}${router.asPath}`}
      />
      <MainHeader />
      <MainTitle username={username} />
      <CommunityList />
    </MainLayout>
  );
};

export default Main;
