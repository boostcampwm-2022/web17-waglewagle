import type { ThreadData } from '#types/types';
import { apis } from '@apis/index';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';

const useThreadListQuery = (keywordId: string) => {
  const { data, isLoading, isFetching } = useQuery<ThreadData[], AxiosError>(
    ['keywordThreadList', keywordId],
    async () => {
      const { data } = await apis.thread.getKeywordThreads(keywordId);
      return data;
    },
    {
      enabled: !!keywordId,
      refetchInterval: 1000,
      onError: (error) => {
        const message = axios.isAxiosError(error)
          ? error.response?.data.message
          : '알 수 없는 에러가 발생했어요!🫢';
        alert(message);
      },
    },
  );

  return { data, isLoading, isFetching };
};

export default useThreadListQuery;
