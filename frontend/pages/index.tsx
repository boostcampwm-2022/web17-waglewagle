import {
  HomeHero,
  HomeLayout,
  HomeMainLayout,
  HomeTitle,
  HomeDescriptionLayout,
  HomeChevronDown,
} from '@components/home';
import HomeProblem from '@components/home/HomeProblem';
import HomeIntroduce from '@components/home/HomeIntroduce';
import HomeManual from '@components/home/HomeManual';
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
        <HomeIntroduce />
        <HomeManual />
      </HomeDescriptionLayout>
    </HomeLayout>
  );
};

export default Home;
