import {
  HomeHero,
  HomeLayout,
  HomeMainLayout,
  HomeTitle,
  HomeChevronDown,
} from '@components/home';
import StartButton from '@components/home/StartButton';
import HomeDescription from '@components/home/HomeDescription';
import SeoHead from '@components/common/Head';
import { useRouter } from 'next/router';
import config from '../config';
import useMockUserMe from '@hooks/useMockUserMe';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();
  // TODO: 나중에 /user/me 수정되면 삭제하기
  const mockUserData = useMockUserMe();

  useEffect(() => {
    if (mockUserData) {
      router.push('/community/1');
    }
  }, [mockUserData]);

  return (
    <HomeLayout>
      <SeoHead
        title='와글와글 | 홈'
        description='데이터 시각화를 통한 중규모 커뮤니티 소모임 관리 서비스'
        url={`${config.HOST}${router.asPath}`}
      />
      <HomeMainLayout>
        <HomeTitle />
        <HomeHero />
        <StartButton />
        <HomeChevronDown />
      </HomeMainLayout>
      <HomeDescription />
    </HomeLayout>
  );
};

export default Home;
