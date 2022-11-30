import React, { useEffect, useState } from 'react';
import MyKeyword from './MyKeyword';
import MyKeywordList from './MyKeywordList';
import KeywordAssociated from './KeywordAssociated';
import styles from '@sass/components/community/KeywordAddModal.module.scss';
import classnames from 'classnames/bind';
import KeywordAdder from './KeywordAdder';
const cx = classnames.bind(styles);

type keywordProps = {
  keyword: string;
  id: string;
};

const KeywordAddModal = () => {
  const [myKeywordList, setMyKeywordList] = useState<keywordProps[] | []>([]);

  useEffect(() => {
    setMyKeywordList([
      {
        keyword: '논',
        id: '1',
      },
      {
        keyword: '밭',
        id: '2',
      },
    ]);
  }, []);

  return (
    <div className={cx('container')}>
      <header className={cx('header')}>
        <h3 className={cx('title')}>세 개 이상 추가해보세요</h3>
        {/* 지금은 필요 없어서 리셋버튼 삭제 */}
      </header>
      <main className={cx('main')}>
        <section className={cx('keyword-add-section')}>
          <div className={cx('keyword-add-container')}>
            <KeywordAdder theme='modal' addButtonValue='추가하기' />
          </div>
          {/* 키워드 추천은 추가 섹션과 기능적으로 연관되어있다고 할 수 있을까? */}
          <KeywordAssociated />
        </section>
        <section className={cx('my-keyword-section')}>
          <hr />
          <h4 className={cx('my-keyword-title')}>내 키워드</h4>
          <MyKeywordList>
            {myKeywordList.map((keywordData) => (
              <MyKeyword key={keywordData.id} keyword={keywordData.keyword} />
            ))}
          </MyKeywordList>
          <button className={cx('enter-button')}>입장하기</button>
        </section>
      </main>
    </div>
  );
};

export default KeywordAddModal;
