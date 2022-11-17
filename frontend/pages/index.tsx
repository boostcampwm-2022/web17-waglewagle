import {
  HomeHero,
  HomeLayout,
  HomeMainLayout,
  HomeTitle,
  HomeDescriptionLayout,
  HomeChevronDown,
} from '@components/home';
import { DefaultButton } from '@components/common';

const Home = () => {
  return (
    <HomeLayout>
      <HomeMainLayout>
        <HomeTitle />
        <HomeHero />
        <DefaultButton width={200} height={40} fontSize={18}>
          시작하기
        </DefaultButton>
        <HomeChevronDown />
      </HomeMainLayout>
      <HomeDescriptionLayout>
        <p>설명</p>
      </HomeDescriptionLayout>
    </HomeLayout>
  );
};

export default Home;
