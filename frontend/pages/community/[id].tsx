import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { apis } from '@apis/index';
import { Loading, Modal } from '@components/common';
import SeoHead from '@components/common/Head';
import {
  CommunityHeader,
  CommunityLayout,
  MainKeywordHandlerLayout,
} from '@components/community';
import CommunityKeywordList from '@components/community/CommunityKeywordList';
import { KeywordAdderContent } from '@components/community/keyword-adder';
import { KeywordBubbleChart } from '@components/community/keyword-bubble-chart';
import { KeywordGroupModalContent } from '@components/community/keyword-group';
import MyKeywordHighlight from '@components/community/MyKeywordHighlight';
import { KEYWORD_ADDER_THEME } from '@constants/constants';
import useJoinBoostcampCommunity from '@hooks/useJoinBoostcampCommunity';
import useUserCommunityQuery from '@hooks/useUserCommunityQuery';
import useUserMe from '@hooks/useUserMe';
import AddCircleIcon from '@public/images/icons/add-circle.svg';
import config from '../../config';
import type { KeywordGroupData, MyKeywordData } from '#types/types';

const LoginModalContent = dynamic(
  () => import('@components/common/LoginModalContent'),
  {
    loading: () => <Loading />,
  },
);

const KeywordAddModalContent = dynamic(
  () =>
    import(
      '../../components/community/keyword-add-modal/KeywordAddModalContent'
    ),
  {
    loading: () => <Loading />,
  },
);

const Community = () => {
  const router = useRouter();
  const communityId = router.query.id as string;
  useJoinBoostcampCommunity();

  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [isOpenKeywordModal, setIsOpenKeywordModal] = useState<boolean>(false);
  const [isMyKeywordHighlight, setIsMyKeywordHighlight] =
    useState<boolean>(false);
  const [isOpenKeywordGroupModal, setIsOpenKeywordGroupModal] =
    useState<boolean>(false);
  const [prevKeyword, setPrevKeyword] = useState<MyKeywordData>();
  const [keywordGroupData, setKeywordGroupData] = useState<KeywordGroupData>();

  const { data: userCommunityList } = useUserCommunityQuery();
  const userData = useUserMe(communityId);

  const handleChangePrevKeyword = (newPrevKeyword: MyKeywordData) => {
    setPrevKeyword(newPrevKeyword);
  };

  const handleChangeKeywordGroupData = (
    newKeywordGroupData: KeywordGroupData,
  ) => {
    setIsOpenKeywordGroupModal(true);
    setKeywordGroupData(newKeywordGroupData);
  };

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

  useEffect(() => {
    if (!userData) {
      return;
    }

    const interval = setInterval(() => {
      apis.user.updateLastActivity();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [userData, userCommunityList, communityId]);

  useEffect(() => {
    if (userData?.isFirstInCommunity) {
      setIsOpenKeywordModal(true);
    }
  }, [userData?.isFirstInCommunity]);

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
      <CommunityKeywordList
        handleChangeKeywordGroupData={handleChangeKeywordGroupData}
      />
      <KeywordBubbleChart
        isMyKeywordHighlight={isMyKeywordHighlight}
        handleChangeKeywordGroupData={handleChangeKeywordGroupData}
      />
      {userData && (
        <MainKeywordHandlerLayout>
          <KeywordAdderContent
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
