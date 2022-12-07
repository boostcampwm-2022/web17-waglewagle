import { REACT_QUERY_KEY } from '@constants/constants';
import { useQuery } from '@tanstack/react-query';
import apis from '../apis/apis';
import { MyKeywordData } from '../types/types';

const useMyKeywordQuery = (communityId: string) => {
  const { data } = useQuery<MyKeywordData[]>(
    [REACT_QUERY_KEY.MY_KEYWORD_LIST, communityId],
    () => {
      const data = apis.getMyKeywordList(communityId);
      return data;
    },
    {
      initialData: [],
      enabled: !!communityId,
    },
  );

  return data;
};

export default useMyKeywordQuery;
