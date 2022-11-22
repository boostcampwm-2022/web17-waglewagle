import { Modal } from '@components/common';
import LoginModalContent from '@components/common/LoginModalContent';
import {
  AutoComplete,
  CommunityHeader,
  CommunityLayout,
} from '@components/community';
import { useEffect, useState } from 'react';

const Community = () => {
  const [userData, setUserData] = useState<string | null>('');
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [isOpenKeywordModal, setIsOpenKeywordModal] = useState<boolean>(false);

  const handleClickEnter = () => {
    setIsOpenLoginModal(true);
  };

  const handleClickKeywordModal = () => {
    setIsOpenKeywordModal(true);
  };

  useEffect(() => {
    const username = localStorage.getItem('waglewagle-username');
    setUserData(username);
  }, []);

  return (
    <CommunityLayout>
      <CommunityHeader
        title='부스트캠프 7기'
        userData={userData}
        handleClickKeywordModal={handleClickKeywordModal}
        handleClickEnter={handleClickEnter}
      />
      <AutoComplete />
      <Modal
        isOpenModal={isOpenLoginModal}
        closeModal={() => setIsOpenLoginModal(false)}
      >
        <LoginModalContent />
      </Modal>
      <Modal
        isOpenModal={isOpenKeywordModal}
        closeModal={() => setIsOpenKeywordModal(false)}
      >
        <div>1</div>
      </Modal>
    </CommunityLayout>
  );
};

export default Community;
