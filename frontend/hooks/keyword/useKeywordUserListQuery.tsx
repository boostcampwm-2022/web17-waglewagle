import { useQuery } from '@tanstack/react-query';
import { apis } from '@apis/index';
import type { KeywordUser } from '#types/types';

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
    // 키워드내의 유저 리스트에서 발생하는 에러는 유저가 몰라도 된다고 생각하여 onError를 추가하지 않음.
  );

  return { data, isLoading, isFetching };
};

export default useKeywordUserListQuery;
