import { Modal, Loading } from '@components/common';
import {
  CommunityHeader,
  CommunityLayout,
  KeywordBubbleChart,
} from '@components/community';
import KeywordAdder from '@components/community/KeywordAdder';
import AddCircleIcon from '@public/images/add-circle.svg';
import { KEYWORD_ADDER_THEME, MVP_DEFAULT } from '@constants/constants';
import { useState, useEffect } from 'react';
import useUserMe from '@hooks/useUserMe';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import SeoHead from '@components/common/Head';
import config from '../../config';
import { KeywordGroupData, MyKeywordData } from '#types/types';
import apis from '../../apis/apis';
import MyKeywordHighlight from '@components/community/MyKeywordHighlight';
import MainKeywordHandlerLayout from '@components/community/MainKeywordHandlerLayout';
import { KeywordGroupModalContent } from '@components/community/keyword-group';

const LoginModalContent = dynamic(
  () => import('../../components/common/LoginModalContent'),
  {
    loading: () => <Loading />,
  },
);

const KeywordAddModalContent = dynamic(
  () => import('../../components/community/KeywordAddModalContent'),
  {
    loading: () => <Loading />,
  },
);

const Community = () => {
  const router = useRouter();
  const communityId = router.query.id as string;
  const userData = useUserMe(communityId);
  const [isMyKeywordHighlight, setIsMyKeywordHighlight] =
    useState<boolean>(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [isOpenKeywordModal, setIsOpenKeywordModal] = useState<boolean>(false);
  const [isOpenKeywordGroupModal, setIsOpenKeywordGroupModal] =
    useState<boolean>(false);
  const [prevKeyword, setPrevKeyword] = useState<MyKeywordData>();
  const [keywordGroupData, setKeywordGroupData] = useState<KeywordGroupData>();

  const handleChangePrevKeyword = (newPrevKeyword: MyKeywordData) => {
    setPrevKeyword(newPrevKeyword);
  };

  const handleChangeKeywordGroupDate = (
    newKeywordGroupData: KeywordGroupData,
  ) => {
    setKeywordGroupData(newKeywordGroupData);
  };

  useEffect(() => {
    if (userData) {
      apis.joinCommunity(MVP_DEFAULT.COMMUNITY_ID);
    }
  }, [userData]);

  useEffect(() => {
    if (userData?.isFirstInCommunity) {
      setIsOpenKeywordModal(true);
    }
  }, [userData?.isFirstInCommunity]);

  const handleClickEnter = () => {
    setIsOpenLoginModal(true);
  };

  const handleClickKeywordModal = () => {
    setIsOpenKeywordModal(true);
  };

  const closeKeywordModal = () => {
    setIsOpenKeywordModal(false);
  };

  const toggleIsMyKeywordHighlight = () => {
    setIsMyKeywordHighlight((prev) => !prev);
  };

  return (
    <CommunityLayout>
      <SeoHead
        title='와글와글 | 부스트캠프 7기'
        description='데이터 시각화를 통한 중규모 커뮤니티 소모임 관리 서비스'
        url={`${config.HOST}${router.asPath}`}
      />
      <CommunityHeader
        title='부스트캠프 7기'
        handleClickKeywordModal={handleClickKeywordModal}
        handleClickEnter={handleClickEnter}
      />
      <KeywordBubbleChart isMyKeywordHighlight={isMyKeywordHighlight} />
      {userData && (
        <MainKeywordHandlerLayout>
          <KeywordAdder
            theme={KEYWORD_ADDER_THEME.MAIN}
            addButtonValue={<AddCircleIcon />}
            handleChangePrevKeyword={handleChangePrevKeyword}
          />
          <MyKeywordHighlight
            toggleIsMyKeywordHighlight={toggleIsMyKeywordHighlight}
          />
        </MainKeywordHandlerLayout>
      )}
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
        <KeywordAddModalContent
          prevKeyword={prevKeyword}
          handleChangePrevKeyword={handleChangePrevKeyword}
          closeKeywordModal={closeKeywordModal}
        />
      </Modal>
      <Modal
        isOpenModal={isOpenKeywordGroupModal}
        closeModal={() => setIsOpenKeywordGroupModal(false)}
      >
        {keywordGroupData && (
          <KeywordGroupModalContent
            keywordId={keywordGroupData.keywordId}
            keyword={keywordGroupData.keyword}
          />
        )}
      </Modal>
    </CommunityLayout>
  );
};

export default Community;
