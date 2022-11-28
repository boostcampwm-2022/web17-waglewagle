import React, { useEffect, useState } from 'react';
import MyKeyword from './MyKeyword';
import MyKeywordList from './MyKeywordList';
import { GrPowerReset } from 'react-icons/gr';
import KeywordAssociated from './KeywordAssociated';
import styles from '@sass/components/community/KeywordAddModal.module.scss';
import classnames from 'classnames/bind';
import TrieSearchEngine from '../../utils/TrieSearchEngine';
const cx = classnames.bind(styles);

type keywordProps = {
  keyword: string;
  id: string;
};

const searchEngine = new TrieSearchEngine();

const KeywordAddModal = () => {
  const [myKeywordList, setMyKeywordList] = useState<keywordProps[] | []>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<string[]>(['']);
  const [isOpenDropdown, setIsOpenDropDown] = useState<boolean>(false);

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const searchEngineResult = searchEngine.search(searchKeyword);
    setSearchResult(searchEngineResult);
    setIsOpenDropDown(true);
    setSearchKeyword('');
  };

  const handleChangeSearchKeyword: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    setSearchKeyword(e.target.value);
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
    ];

    mockWordList.forEach((word) => {
      searchEngine.insert(word);
    });

    setSearchResult(mockWordList.map(({ keyword }) => keyword));
  }, []);

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
        <button className={cx('reset-button')}>
          {/* 지금은 선택이 없어서 지워야할까? 헤더에 들어가는게 맞을까? UX적으로 맞다고 할 수도 있지 않을까? */}
          <GrPowerReset />
        </button>
      </header>
      <main className={cx('main')}>
        <section className={cx('keyword-add-section')}>
          <div className={cx('keyword-add-container')}>
            <form
              onSubmit={handleSearchSubmit}
              className={cx('keyword-add-form')}
            >
              <input
                onFocus={() => setIsOpenDropDown(true)}
                onBlur={() => setIsOpenDropDown(false)}
                onChange={handleChangeSearchKeyword}
                value={searchKeyword}
                className={cx('keyword-add-input')}
              />
              <button className={cx('keyword-add-button')}>추가하기</button>
            </form>
            {/* TODO: 리팩토링때 추상화시켜서 공통으로 쓰기*/}
            {isOpenDropdown && (
              <ul className={cx('search-result-list')}>
                {searchResult.map((word) => (
                  <li key={word}>{word}</li>
                ))}
              </ul>
            )}
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
