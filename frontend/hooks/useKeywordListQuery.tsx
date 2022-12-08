import { REACT_QUERY_KEY } from '@constants/constants';
import { useQuery } from '@tanstack/react-query';
import apis from '../apis/apis';
import { KeywordData } from '../types/types';

// TS를 통해서 communityId가 들어오므로 useKeywordListFromCommuntyQuery라는 이름에서 간소화하였음. 추후 혼동이 생길 수 있으면 변경 가능.
const useKeywordListQuery = (communityId: string) => {
  const { data, isLoading, isFetching } = useQuery<KeywordData[]>(
    [REACT_QUERY_KEY.KEYWORD, communityId],
    () => {
      const data = apis.getKeywords(communityId);
      return data;
    },
    {
      enabled: !!communityId,
      refetchInterval: 5000,
    },
  );

  return { data, isLoading, isFetching };
};

export default useKeywordListQuery;
