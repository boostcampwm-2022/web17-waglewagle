import { Modal } from '@components/common';
import LoginModalContent from '@components/common/LoginModalContent';
import {
  AutoComplete,
  CommunityHeader,
  CommunityLayout,
} from '@components/community';
import { useState } from 'react';

const Community = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleClickEnter = () => {
    setIsOpenModal(true);
  };

  return (
    <CommunityLayout>
      <CommunityHeader
        title='부스트캠프 7기'
        handleClickEnter={handleClickEnter}
      />
      <AutoComplete />
      <Modal isOpenModal={isOpenModal} closeModal={() => setIsOpenModal(false)}>
        <LoginModalContent />
      </Modal>
    </CommunityLayout>
  );
};

export default Community;
