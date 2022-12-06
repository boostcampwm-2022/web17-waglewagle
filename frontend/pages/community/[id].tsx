import { Modal, Loading } from '@components/common';
import {
  CommunityHeader,
  CommunityLayout,
  KeywordBubbleChart,
} from '@components/community';
import KeywordAdder from '@components/community/KeywordAdder';
import AddCircleIcon from '@public/images/add-circle.svg';
import { KEYWORD_ADDER_THEME } from '@constants/constants';
import { useState } from 'react';
import useUserMe from '@hooks/useUserMe';
import { KeywordRelatedData, MyKeywordData } from '../../types/types';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import SeoHead from '@components/common/Head';
import config from '../../config';

const LoginModalContent = dynamic(
  () => import('../../components/common/LoginModalContent'),
  {
    loading: () => <Loading />,
  },
);

const KeywordAddModal = dynamic(
  () => import('../../components/community/KeywordAddModal'),
  {
    loading: () => <Loading />,
  },
);

const Community = () => {
  const router = useRouter();
  const { id } = router.query;
  const userData = useUserMe(id as string);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [isOpenKeywordModal, setIsOpenKeywordModal] = useState<boolean>(false);
  // ======== 이하는 서버 상태 관리르 분리되어야함. ========
  const [prevAddedKeyword, setPrevAddedKeyword] = useState<string>('');
  const [relatedKeywordList, setRelatedKeywordList] = useState<
    KeywordRelatedData[]
  >([]);
  const [myKeywordList, setMyKeywordList] = useState<MyKeywordData[]>([]);

  const handleChangePrevAddedKeyword = (newPrevKeyword: string) => {
    setPrevAddedKeyword(newPrevKeyword);
  };

  const handleChangeMyKeywordList = (newList: MyKeywordData[]) => {
    setMyKeywordList(newList);
  };

  const handleChangeRelatedKeywordList = (newList: KeywordRelatedData[]) => {
    setRelatedKeywordList(newList);
  };

  // ======== 절취선 ========

  const handleClickEnter = () => {
    setIsOpenLoginModal(true);
  };

  const handleClickKeywordModal = () => {
    setIsOpenKeywordModal(true);
  };

  const closeLoginModal = () => {
    setIsOpenLoginModal(false);
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
      <KeywordBubbleChart />
      {userData && (
        <KeywordAdder
          theme={KEYWORD_ADDER_THEME.MAIN}
          addButtonValue={<AddCircleIcon />}
          myKeywordList={myKeywordList}
          handleChangeMyKeywordList={handleChangeMyKeywordList}
          handleChangePrevAddedKeyword={handleChangePrevAddedKeyword}
          handleChangeRelatedKeywordList={handleChangeRelatedKeywordList}
        />
      )}
      <Modal
        isOpenModal={isOpenLoginModal}
        closeModal={() => setIsOpenLoginModal(false)}
      >
        <LoginModalContent closeLoginModal={closeLoginModal} />
      </Modal>
      <Modal
        isOpenModal={isOpenKeywordModal}
        closeModal={() => setIsOpenKeywordModal(false)}
      >
        <KeywordAddModal
          prevAddedKeyword={prevAddedKeyword}
          myKeywordList={myKeywordList}
          relatedKeywordList={relatedKeywordList}
          handleChangeMyKeywordList={handleChangeMyKeywordList}
          handleChangePrevAddedKeyword={handleChangePrevAddedKeyword}
          handleChangeRelatedKeywordList={handleChangeRelatedKeywordList}
        />
      </Modal>
    </CommunityLayout>
  );
};

export default Community;
