import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import TrieSearchEngine from '../../utils/TrieSearchEngine';
import AddCircleIcon from '@public/images/add-circle.svg';
import styles from '@sass/components/community/AutoComplete.module.scss';
import { useQuery } from '@tanstack/react-query';
import classnames from 'classnames/bind';
import { KeywordData } from '../../types/types';
import apis from '../../apis/apis';
import { useRouter } from 'next/router';
const cx = classnames.bind(styles);

const searchEngine = new TrieSearchEngine();

const AutoComplete = () => {
  const router = useRouter();
  const communityId: string = router.query.id as string;
  const [communityKeywordData, setCommunityKeywordData] = useState<
    KeywordData[]
  >([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<string[]>(['']);
  const [isOpenDropdown, setIsOpenDropDown] = useState<boolean>(false);

  const { data } = useQuery<KeywordData[]>(
    ['keyword', communityId],
    () => {
      const data = apis.getKeywords(communityId);
      return data;
    },
    {
      enabled: !!communityId,
    },
  );

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
    if (!data) {
      return;
    }
    setCommunityKeywordData(data);
  }, [data]);

  useEffect(() => {
    if (communityKeywordData.length) {
      communityKeywordData.forEach((keywordData) => {
        searchEngine.insert({
          keyword: keywordData.keywordName,
          count: keywordData.memberCount,
        });
      });

      setSearchResult(
        communityKeywordData.map(({ keywordName }) => keywordName),
      );
    }
  }, [communityKeywordData]);

  return (
    // TODO: 자동완성 문자열과의 인터랙션 추가하기 (입력 단어 변경등)
    <div className={cx('auto-complete')}>
      {isOpenDropdown && (
        <ul className={cx('search-result')}>
          {searchResult.map((word, index) => (
            <li key={index}>{word}</li>
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
