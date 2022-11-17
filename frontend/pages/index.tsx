import {
  HomeHero,
  HomeLayout,
  HomeMainLayout,
  HomeTitle,
  HomeDescriptionLayout,
  HomeChevronDown,
} from '@components/home';
import ButtonLayout from '@components/common/ButtonLayout';

const Home = () => {
  return (
    <HomeLayout>
      <HomeMainLayout>
        <HomeTitle />
        <HomeHero />
        <ButtonLayout width={200} height={40} fontSize={18}>
          시작하기
        </ButtonLayout>
        <HomeChevronDown />
      </HomeMainLayout>
      <HomeDescriptionLayout>
        <p>설명</p>
      </HomeDescriptionLayout>
    </HomeLayout>
  );
};

export default Home;
