import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import TrieSearchEngine from '../../utils/TrieSearchEngine';

const searchEngine = new TrieSearchEngine();

const Community = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<string[]>(['']);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const searchEngineResult = searchEngine.search(searchKeyword);
    setSearchResult(searchEngineResult);
    setSearchKeyword('');
  };

  const handleChangeSearchKeyword: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
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
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={searchKeyword}
          onChange={handleChangeSearchKeyword}
        />
        <button type='submit'>뀨</button>
      </form>
      <ul>
        {searchResult.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
    </>
  );
};

export default Community;
