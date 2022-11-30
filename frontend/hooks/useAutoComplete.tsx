import TrieSearchEngine from '@utils/TrieSearchEngine';
import { KeywordData } from '../types/types';
import { useEffect, useState } from 'react';

// 외부변수를 사용해서 모든 useAutoComplete가 같은 엔진을 사용하도록함.
const searchEngine = new TrieSearchEngine();

const useAutoComplete = (keywordList: KeywordData[]) => {
  const [initResult, setInitResult] = useState<string[]>(['']);

  useEffect(() => {
    if (keywordList.length) {
      keywordList.forEach((keywordData) => {
        searchEngine.insert({
          keyword: keywordData.keywordName,
          count: keywordData.memberCount,
        });
      });

      setInitResult(keywordList.map(({ keywordName }) => keywordName));
    }
  }, [keywordList]);

  return { searchEngine, initResult };
};

export default useAutoComplete;
