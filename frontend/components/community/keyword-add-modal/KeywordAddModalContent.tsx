import React from 'react';
import classnames from 'classnames/bind';
import styles from '@sass/components/community/KeywordAddModal.module.scss';
import { MyKeywordData } from '#types/types';
import { KEYWORD_ADDER_THEME } from '@constants/constants';
import KeywordAdder from '../keyword-adder/KeywordAdderContent';
import KeywordAssociated from './KeywordAssociated';
import MyKeywordList from './MyKeywordList';
import EnterButton from './EnterButton';

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
  return (
    <div className={cx('container')}>
      <header className={cx('header')}>
        <h3 className={cx('title')}>관심있는 키워드를 추가해보세요!</h3>
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
          <KeywordAssociated prevKeyword={prevKeyword} />
        </section>
        <section className={cx('my-keyword-section')}>
          <hr />
          <h4 className={cx('my-keyword-title')}>내 키워드</h4>
          <MyKeywordList />
          <EnterButton closeKeywordModal={closeKeywordModal} />
        </section>
      </main>
    </div>
  );
};

export default KeywordAddModalContent;
