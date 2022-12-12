import React from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import styles from '@sass/components/community/KeywordAddModal.module.scss';
import apis from '@apis/apis';
import { useMyKeywordQuery } from '@hooks/keyword';
import useUserMe from '@hooks/useUserMe';
import { MyKeywordData } from '#types/types';
import { KEYWORD_ADDER_THEME } from '@constants/constants';
import KeywordAdder from '../keyword-adder/KeywordAdder';
import KeywordAssociated from './KeywordAssociated';
import MyKeywordList from './MyKeywordList';

const cx = classnames.bind(styles);

interface KeywordAddModalContent {
  prevKeyword?: MyKeywordData;
  handleChangePrevKeyword: (prevKeyword: MyKeywordData) => void;
  closeKeywordModal: () => void;
}

const KeywordAddModalContent = ({
  prevKeyword,
  handleChangePrevKeyword,
  closeKeywordModal,
}: KeywordAddModalContent) => {
  const router = useRouter();
  const communityId = router.query.id as string;
  const userData = useUserMe(communityId);
  const { data: myKeywordList } = useMyKeywordQuery(communityId);

  const handleClickEnter = async () => {
    await apis.updateFirstVisitInCommunity(communityId);
    closeKeywordModal();
  };

  return (
    <div className={cx('container')}>
      <header className={cx('header')}>
        <h3 className={cx('title')}>관심있는 키워드를 추가해보세요!</h3>
        {/* 지금은 필요 없어서 리셋버튼 삭제 */}
      </header>
      <main className={cx('main')}>
        <section className={cx('keyword-add-section')}>
          <div className={cx('keyword-add-container')}>
            <KeywordAdder
              theme={KEYWORD_ADDER_THEME.MODAL}
              addButtonValue='추가하기'
              handleChangePrevKeyword={handleChangePrevKeyword}
            />
          </div>
          {/* 키워드 추천은 추가 섹션과 기능적으로 연관되어있다고 할 수 있을까? */}
          <KeywordAssociated prevKeyword={prevKeyword} />
        </section>
        <section className={cx('my-keyword-section')}>
          <hr />
          <h4 className={cx('my-keyword-title')}>내 키워드</h4>
          <MyKeywordList />
          {userData?.isFirstInCommunity ? (
            <button
              disabled={myKeywordList.length > 0 ? false : true}
              onClick={handleClickEnter}
              className={cx('enter-button')}
            >
              입장하기
            </button>
          ) : (
            <button onClick={closeKeywordModal} className={cx('enter-button')}>
              닫기
            </button>
          )}
        </section>
      </main>
    </div>
  );
};

export default KeywordAddModalContent;
