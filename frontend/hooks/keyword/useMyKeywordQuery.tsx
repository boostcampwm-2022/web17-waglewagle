import { useQuery } from '@tanstack/react-query';
import { apis } from '@apis/index';
import { REACT_QUERY_KEY } from '@constants/constants';
import axios from 'axios';
import type { MyKeywordData } from '#types/types';

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
      onError: (error) => {
        const message = axios.isAxiosError(error)
          ? error.response?.data.message
          : '내 키워드 목록을 읽어오던 중, 알 수 없는 에러가 발생했어요!';
        alert(message);
      },
    },
  );

  return { data };
};

export default useMyKeywordQuery;
