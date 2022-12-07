import { useQuery } from '@tanstack/react-query';
import apis from '../apis/apis';
import { ThreadData } from '../types/types';

const useThreadListQuery = (communityId: string) => {
  const { data, isLoading, isFetching } = useQuery<ThreadData[]>(
    ['keywordThreadList', communityId],
    () => {
      const data = apis.getKeywordThreads(communityId);
      return data;
    },
    {
      enabled: !!communityId,
      refetchInterval: 1000,
    },
  );

  return { data, isLoading, isFetching };
};

export default useThreadListQuery;
