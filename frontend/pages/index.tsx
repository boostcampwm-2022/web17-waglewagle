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
import { useState, useEffect } from 'react';
import { LoginModalContent, Modal } from '@components/common';
import useUserMe from '@hooks/useUserMe';

const Home = () => {
  const router = useRouter();
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const userData = useUserMe();

  const openLoginModal = () => {
    setIsOpenLoginModal(true);
  };

  useEffect(() => {
    if (userData) {
      router.push('/main');
    }
  }, [userData]);

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
        <LoginModalContent />
      </Modal>
    </HomeLayout>
  );
};

export default Home;
