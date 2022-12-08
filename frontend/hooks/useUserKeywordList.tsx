import { KeywordRelatedData, MyKeywordData } from '#types/types';
import { useState } from 'react';

// 이렇게 관리해두면 React Query 연결할 때 편하지 않을까?
// 어차피 React Query도 Hooks로 관리할테니 이 부분만 수정해주면 되어서 편할 것 같다.
const useUserKeywordList = () => {
  const [myKeywordList, setMyKeywordList] = useState<MyKeywordData[]>([]); // api 생기기 이전 임시로 작성
  const [relatedKeywordList, setRelatedKeywordList] = useState<
    KeywordRelatedData[]
  >([]); // api 생기기 이전 임시로 작성

  // API 연결 이전 Mocking 데이터
  const handleChangeMyKeywordList = (newList: MyKeywordData[]) => {
    setMyKeywordList(newList);
  };

  // API 연결 이전 Mocking 데이터
  const handleChangeRelatedKeywordList = (newList: KeywordRelatedData[]) => {
    setRelatedKeywordList(newList);
  };

  return {
    myKeywordList,
    relatedKeywordList,
    handleChangeMyKeywordList,
    handleChangeRelatedKeywordList,
  };
};

export default useUserKeywordList;
