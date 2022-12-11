import { ThreadData } from '#types/types';
import { useQuery } from '@tanstack/react-query';
import apis from '../apis/apis';

const useThreadListQuery = (keywordId: string) => {
  const { data, isLoading, isFetching } = useQuery<ThreadData[]>(
    ['keywordThreadList', keywordId],
    () => apis.getKeywordThreads(keywordId),
    {
      enabled: !!keywordId,
      refetchInterval: 1000,
    },
  );

  return { data, isLoading, isFetching };
};

export default useThreadListQuery;
