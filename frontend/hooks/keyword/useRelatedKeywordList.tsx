import { useQuery } from '@tanstack/react-query';
import { apis } from '@apis/index';
import { REACT_QUERY_KEY } from '@constants/constants';
import type { MyKeywordData } from '#types/types';

// 이전 입력 키워드가 없는 상태로 useRelatedKeywordList가 호출될 수 있음.
// Tanstack Query 내부에서 enabled 설정을 통해 문제를 해결함.
// useQuery에서 전달해주는 인자에 대한 타입 추론을 제대로 못해서 non-null assertion 사용함.
const useRelatedKeywordList = (prevKeyword?: MyKeywordData) => {
  const getRelatedKeywordList = async () => {
    const { data } = await apis.keyword.getKeywordAssociations(
      prevKeyword!.keywordId,
    );
    return data;
  };

  const { data, isLoading } = useQuery(
    [REACT_QUERY_KEY.RELATED_KEYWORD, prevKeyword],
    getRelatedKeywordList,
    {
      initialData: [],
      enabled: !!prevKeyword,
    },
  );

  return { data, isLoading };
};

export default useRelatedKeywordList;
