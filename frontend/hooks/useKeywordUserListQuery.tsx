import { useQuery } from '@tanstack/react-query';
import apis from '../apis/apis';
import { KeywordUser } from '../types/types';

const useKeywordUserListQuery = (communityId: string) => {
  const { data, isLoading, isFetching } = useQuery<KeywordUser[]>(
    ['keywordUserList', communityId],
    () => {
      const data = apis.getKeywordUsers(communityId);
      return data;
    },
    {
      enabled: !!communityId,
      refetchInterval: 60000,
    },
  );

  return { data, isLoading, isFetching };
};

export default useKeywordUserListQuery;
