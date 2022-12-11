import type { MyKeywordData } from '#types/types';
import { apis } from '@apis/index';
import { REACT_QUERY_KEY } from '@constants/constants';
import { useQuery } from '@tanstack/react-query';

const useMyKeywordQuery = (communityId: string) => {
  const { data } = useQuery<MyKeywordData[]>(
    [REACT_QUERY_KEY.MY_KEYWORD_LIST, communityId],
    async () => {
      const { data } = await apis.keyword.getMyKeywordList(communityId);
      return data;
    },
    {
      initialData: [],
      enabled: !!communityId,
    },
  );

  return { data };
};

export default useMyKeywordQuery;
