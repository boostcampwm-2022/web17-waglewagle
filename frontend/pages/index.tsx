import {
  HomeHero,
  HomeLayout,
  HomeMainLayout,
  HomeTitle,
  HomeDescriptionLayout,
  HomeChevronDown,
} from '@components/home';
import { DefaultButton } from '@components/common';
import axios from 'axios';

const Home = () => {
  const handleClickStartButton = () => {
    axios
      .get('http://www.waglewagle.link/demo')
      .then((response) => {
        alert(`서버에서 값을 잘 받아왔습니다. 값 : ${response.data.TestKey}`);
      })
      .catch(() => {
        alert('서버 통신에 실패했습니다.');
      });
  };

  return (
    <HomeLayout>
      <HomeMainLayout>
        <HomeTitle />
        <HomeHero />
        <DefaultButton
          handleClick={handleClickStartButton}
          width={200}
          height={40}
          fontSize={18}
        >
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
