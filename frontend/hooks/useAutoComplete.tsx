import { useEffect, useState } from 'react';
import TrieSearchEngine from '@utils/searchEngine/TrieSearchEngine';
import type { KeywordData } from '#types/types';

// 외부변수를 사용해서 모든 useAutoComplete가 같은 엔진을 사용하도록함.
const searchEngine = new TrieSearchEngine();

// UI와 비즈니스 로직을 분리하기 위해서 여기에서는 dropDownList를 다루지 않음. 이것이 유의미한 분리가 가능할 것이라고 판단함.
// useAutoComplete의 역할은 searchKeyword를 받아서 searchEngine을 통해 searchResult를 반환해주는 것
const useAutoComplete = (keywordList: KeywordData[] | undefined) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<string[]>(['']);

  // useAutoComplete 내부의 함수는 handler가 아니라 handler 내부에서 실행될 함수여야한다. 그래야 UI와 useAutoComplete 로직을 분리할 수 있음..
  const changeSearchKeyword = (value: string) => {
    setSearchKeyword(value);
  };

  // 키워드 리스트가 바뀔 때마다 searchEngine의 단어를 갱신한다.
  // TODO: 추가된 단어만 추가할 수 있도록 수정할 수 있을까? 현재 성능상의 이슈는 없어서 다른 작업이 먼저일듯함.
  useEffect(() => {
    if (!keywordList) {
      return;
    }
    if (keywordList.length) {
      keywordList.forEach((keywordData) => {
        searchEngine.insert({
          keyword: keywordData.keywordName,
        });
      });

      setSearchResult(keywordList.map(({ keywordName }) => keywordName));
    }
  }, [keywordList]);

  useEffect(() => {
    const searchEngineResult = searchEngine.search(searchKeyword);
    setSearchResult(searchEngineResult);
  }, [searchKeyword]);

  return {
    searchKeyword,
    searchResult,
    changeSearchKeyword,
  };
};

export default useAutoComplete;
