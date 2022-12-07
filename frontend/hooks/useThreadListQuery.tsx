import { REACT_QUERY_KEY } from '@constants/constants';
import { useQuery } from '@tanstack/react-query';
import apis from '../apis/apis';
import { ThreadData } from '../types/types';

const useThreadListQuery = (communityId: string) => {
  const { data, isLoading, isFetching } = useQuery<ThreadData[]>(
    [REACT_QUERY_KEY.KEYWORD, communityId],
    () => {
      const data = apis.getThreads(communityId);
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
