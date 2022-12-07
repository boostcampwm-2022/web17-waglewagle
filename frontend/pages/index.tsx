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
import { useEffect, useState } from 'react';
import apis from '../apis/apis';
import { MVP_DEFAULT } from '@constants/constants';
import { LoginModalContent, Modal } from '@components/common';

const Home = () => {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const router = useRouter();
  // TODO: 나중에 /user/me 수정되면 삭제하기
  const mockUserData = useMockUserMe();

  const openLoginModal = () => {
    setIsOpenLoginModal(true);
  };

  const closeLoginModal = () => {
    setIsOpenLoginModal(false);
  };

  useEffect(() => {
    if (mockUserData) {
      apis.joinCommunity(MVP_DEFAULT.COMMUNITY_ID);
      // router.push('/main');
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
        <StartButton handleClick={openLoginModal} />
        <HomeChevronDown />
      </HomeMainLayout>
      <HomeDescription />
      <Modal
        isOpenModal={isOpenLoginModal}
        closeModal={() => setIsOpenLoginModal(false)}
      >
        <LoginModalContent closeLoginModal={closeLoginModal} />
      </Modal>
    </HomeLayout>
  );
};

export default Home;
