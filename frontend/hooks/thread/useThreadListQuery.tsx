import { ThreadData } from '#types/types';
import { apis } from '@apis/index';
import { useQuery } from '@tanstack/react-query';

const useThreadListQuery = (keywordId: string) => {
  const { data, isLoading, isFetching } = useQuery<ThreadData[]>(
    ['keywordThreadList', keywordId],
    async () => {
      const { data } = await apis.thread.getKeywordThreads(keywordId);
      return data;
    },
    {
      enabled: !!keywordId,
      refetchInterval: 1000,
    },
  );

  return { data, isLoading, isFetching };
};

export default useThreadListQuery;
