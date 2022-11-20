import {
  HomeHero,
  HomeLayout,
  HomeMainLayout,
  HomeTitle,
  HomeDescriptionLayout,
  HomeChevronDown,
  HomeProblem,
  HomeProjectIntroduction,
  HomeManual,
  HomeTeamIntroduction,
} from '@components/home';
import StartButton from '@components/common/StartButton';

const Home = () => {
  return (
    <HomeLayout>
      <HomeMainLayout>
        <HomeTitle />
        <HomeHero />
        <StartButton />
        <HomeChevronDown />
      </HomeMainLayout>
      <HomeDescriptionLayout>
        <HomeProblem />
        <HomeProjectIntroduction />
        <HomeManual />
        <HomeTeamIntroduction />
      </HomeDescriptionLayout>
    </HomeLayout>
  );
};

export default Home;
