import type { KeywordUser } from '#types/types';
import { apis } from '@apis/index';
import { useQuery } from '@tanstack/react-query';

const useKeywordUserListQuery = (communityId: string) => {
  const { data, isLoading, isFetching } = useQuery<KeywordUser[]>(
    ['keywordUserList', communityId],
    async () => {
      const { data } = await apis.keyword.getKeywordUsers(communityId);
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
