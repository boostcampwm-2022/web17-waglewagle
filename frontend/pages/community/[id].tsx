import { Modal, LoginModalContent } from '@components/common';
import {
  CommunityHeader,
  CommunityLayout,
  KeywordAddModal,
  KeywordBubbleChart,
} from '@components/community';
import KeywordAdder from '@components/community/KeywordAdder';
import { KEYWORD_ADDER_THEME } from '@constants/constants';
import { useState, useEffect } from 'react';

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
    if (username) {
      setUserData(username);
    }
  }, []);

  return (
    <CommunityLayout>
      <CommunityHeader
        title='부스트캠프 7기'
        userData={userData}
        handleClickKeywordModal={handleClickKeywordModal}
        handleClickEnter={handleClickEnter}
      />
      <KeywordBubbleChart />
      <KeywordAdder theme={KEYWORD_ADDER_THEME.MAIN} />
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
        <KeywordAddModal />
      </Modal>
    </CommunityLayout>
  );
};

export default Community;
