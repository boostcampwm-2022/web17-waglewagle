import { KeywordData } from '#types/types';
import { apis } from '@apis/index';
import { REACT_QUERY_KEY } from '@constants/constants';
import { useQuery } from '@tanstack/react-query';

// TS를 통해서 communityId가 들어오므로 useKeywordListFromCommuntyQuery라는 이름에서 간소화하였음. 추후 혼동이 생길 수 있으면 변경 가능.
const useKeywordListQuery = (communityId: string) => {
  const { data, isLoading, isFetching } = useQuery<KeywordData[]>(
    [REACT_QUERY_KEY.KEYWORD, communityId],
    async () => {
      const { data } = await apis.keyword.getKeywords(communityId);
      data.sort((a, b) => b.memberCount - a.memberCount);
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
