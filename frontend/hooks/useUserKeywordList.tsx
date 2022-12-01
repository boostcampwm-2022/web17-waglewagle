import { useState } from 'react';
import { KeywordData } from '../types/types';

// 이렇게 관리해두면 React Query 연결할 때 편하지 않을까?
// 어차피 React Query도 Hooks로 관리할테니 이 부분만 수정해주면 되어서 편할 것 같다.
const useUserKeywordList = () => {
  const [myKeywordList, setMyKeywordList] = useState<KeywordData[]>([]); // api 생기기 이전 임시로 작성
  const [recentAssociationKeywordList, setRecentAssociationKeywordList] =
    useState<KeywordData[]>([]); // api 생기기 이전 임시로 작성

  // API 연결 이전 Mocking 데이터
  const handleChangeMyKeywordList = (newList: KeywordData[]) => {
    setMyKeywordList(newList);
  };

  // API 연결 이전 Mocking 데이터
  // TODO: 변수명... 이거 맞아?
  const handleChangeRecentAssociationKeywordList = (newList: KeywordData[]) => {
    setRecentAssociationKeywordList(newList);
  };

  return {
    myKeywordList,
    recentAssociationKeywordList,
    handleChangeMyKeywordList,
    handleChangeRecentAssociationKeywordList,
  };
};

export default useUserKeywordList;
