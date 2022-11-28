import { Modal } from '@components/common';
import LoginModalContent from '@components/common/LoginModalContent';
import {
  AutoComplete,
  CommunityHeader,
  CommunityLayout,
  KeywordAddModal,
  KeywordBubbleChart,
} from '@components/community';
import { useEffect, useState } from 'react';
import { KeywordData } from '../../types/types';

const Community = () => {
  const [userData, setUserData] = useState<string | null>('');
  const [communityKeywordData, setCommunityKeywordData] = useState<
    KeywordData[]
  >([]);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [isOpenKeywordModal, setIsOpenKeywordModal] = useState<boolean>(false);

  const handleClickEnter = () => {
    setIsOpenLoginModal(true);
  };

  const handleClickKeywordModal = () => {
    setIsOpenKeywordModal(true);
  };

  useEffect(() => {
    // TODO : 나중에는 서버에서 받아와야한다.
    const mockWordList = [
      { keyword: '가', count: 3 },
      { keyword: '다', count: 3 },
      { keyword: '나', count: 3 },
      { keyword: '가나', count: 3 },
      { keyword: '가다', count: 3 },
      { keyword: '가나다', count: 2 },
      { keyword: '가나라', count: 3 },
      { keyword: '가나라마', count: 3 },
      { keyword: '가나라마바사아자카파타하', count: 5 },
    ];

    const username = localStorage.getItem('waglewagle-username');
    setUserData(username);
    setCommunityKeywordData(mockWordList);
  }, []);

  return (
    <CommunityLayout>
      <CommunityHeader
        title='부스트캠프 7기'
        userData={userData}
        handleClickKeywordModal={handleClickKeywordModal}
        handleClickEnter={handleClickEnter}
      />
      <KeywordBubbleChart communityKeywordData={communityKeywordData} />
      <AutoComplete communityKeywordData={communityKeywordData} />
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
