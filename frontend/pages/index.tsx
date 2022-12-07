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

const Home = () => {
  const router = useRouter();
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
