import HomeHero from '@components/home/HomeHero';
import HomeLayout from '@components/home/HomeLayout';
import HomeMainLayout from '@components/home/HomeMainLayout';
import HomeTitle from '@components/home/HomeTitle';

const Home = () => {
  return (
    <HomeLayout>
      <HomeMainLayout>
        <HomeTitle />
        <HomeHero />
      </HomeMainLayout>
    </HomeLayout>
  );
};

export default Home;
