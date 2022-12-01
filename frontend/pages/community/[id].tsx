import { Modal, LoginModalContent } from '@components/common';
import {
  CommunityHeader,
  CommunityLayout,
  KeywordAddModal,
  KeywordBubbleChart,
} from '@components/community';
import KeywordAdder from '@components/community/KeywordAdder';
import AddCircleIcon from '@public/images/add-circle.svg';
import { KEYWORD_ADDER_THEME } from '@constants/constants';
import { useState } from 'react';
import useUserMe from '@hooks/useUserMe';

const Community = () => {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [isOpenKeywordModal, setIsOpenKeywordModal] = useState<boolean>(false);

  const handleClickEnter = () => {
    setIsOpenLoginModal(true);
  };

  const handleClickKeywordModal = () => {
    setIsOpenKeywordModal(true);
  };

  return (
    <CommunityLayout>
      <CommunityHeader
        title='부스트캠프 7기'
        handleClickKeywordModal={handleClickKeywordModal}
        handleClickEnter={handleClickEnter}
      />
      <KeywordBubbleChart />
      <KeywordAdder
        theme={KEYWORD_ADDER_THEME.MAIN}
        addButtonValue={<AddCircleIcon />}
      />
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
