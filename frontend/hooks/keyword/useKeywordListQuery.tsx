import { useQuery } from '@tanstack/react-query';
import { apis } from '@apis/index';
import { REACT_QUERY_KEY } from '@constants/constants';
import axios from 'axios';
import type { KeywordData } from '#types/types';
import type { AxiosError } from 'axios';

// TS를 통해서 communityId가 들어오므로 useKeywordListFromCommuntyQuery라는 이름에서 간소화하였음. 추후 혼동이 생길 수 있으면 변경 가능.
const useKeywordListQuery = (communityId: string) => {
  const { data, isLoading, isFetching } = useQuery<KeywordData[], AxiosError>(
    [REACT_QUERY_KEY.KEYWORD, communityId],
    async () => {
      const { data } = await apis.keyword.getKeywords(communityId);
      data.sort((a, b) => b.memberCount - a.memberCount);
      return data;
    },
    {
      enabled: !!communityId,
      refetchInterval: 5000,
      onError: (error) => {
        const message = axios.isAxiosError(error)
          ? error.response?.data.message
          : '키워드를 읽어오던 중, 알 수 없는 에러가 발생했어요!';
        alert(message);
      },
    },
  );

  return { data, isLoading, isFetching };
};

export default useKeywordListQuery;
