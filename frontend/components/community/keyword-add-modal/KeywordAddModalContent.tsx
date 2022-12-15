import classnames from 'classnames/bind';
import { KEYWORD_ADDER_THEME } from '@constants/constants';
import { KeywordAdderContent } from '../keyword-adder';
import EnterButton from './EnterButton';
import KeywordAssociated from './KeywordAssociated';
import ModalKeywordAdderLayout from './ModalKeywordAdderLayout';
import MyKeywordList from './MyKeywordList';
import type { MyKeywordData } from '#types/types';
import styles from '@sass/components/community/keyword-add-modal/KeywordAddModalContent.module.scss';
import useAutoComplete from '@hooks/useAutoComplete';

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
          <ModalKeywordAdderLayout>
            <KeywordAdderContent
              theme={KEYWORD_ADDER_THEME.MODAL}
              addButtonValue='추가하기'
              handleChangePrevKeyword={handleChangePrevKeyword}
            />
          </ModalKeywordAdderLayout>
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
