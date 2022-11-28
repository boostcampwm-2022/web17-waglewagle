import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import TrieSearchEngine from '../../utils/TrieSearchEngine';
import AddCircleIcon from '@public/images/add-circle.svg';
import styles from '@sass/components/community/AutoComplete.module.scss';
import classnames from 'classnames/bind';
import { KeywordData } from '../../types/types';
const cx = classnames.bind(styles);

interface AutoCompleteProps {
  communityKeywordData: KeywordData[];
}

const searchEngine = new TrieSearchEngine();

const AutoComplete = ({ communityKeywordData }: AutoCompleteProps) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<string[]>(['']);
  const [isOpenDropdown, setIsOpenDropDown] = useState<boolean>(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const searchEngineResult = searchEngine.search(searchKeyword);
    setSearchResult(searchEngineResult);
    setIsOpenDropDown(true);
    setSearchKeyword('');
  };

  const handleChangeSearchKeyword: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setSearchKeyword(e.target.value);
  };

  useEffect(() => {
    communityKeywordData.forEach((word) => {
      searchEngine.insert(word);
    });

    setSearchResult(communityKeywordData.map(({ keyword }) => keyword));
  }, []);

  return (
    <div className={cx('auto-complete')}>
      {isOpenDropdown && (
        <ul className={cx('search-result')}>
          {searchResult.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className={cx('form')}>
        <input
          type='text'
          value={searchKeyword}
          onChange={handleChangeSearchKeyword}
          className={cx('input')}
          onFocus={() => setIsOpenDropDown(true)}
          onBlur={() => setIsOpenDropDown(false)}
        />
        <button type='submit' className={cx('submit-button')}>
          <AddCircleIcon />
        </button>
      </form>
    </div>
  );
};

export default AutoComplete;
