import { CommunityData } from '#types/types';
import { REACT_QUERY_KEY } from '@constants/constants';
import { useQuery } from '@tanstack/react-query';
import apis from '../apis/apis';

const useUserCommunityQuery = () => {
  const getCommunityList = (): Promise<CommunityData[]> => {
    const data = apis.getUserCommunityList();

    return data;
  };

  const { data } = useQuery(
    [REACT_QUERY_KEY.USER_COMMUNITY],
    getCommunityList,
    {
      initialData: [],
    },
  );

  return { data };
};

export default useUserCommunityQuery;
