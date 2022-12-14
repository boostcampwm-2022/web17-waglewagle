import type { CommunityData } from '#types/types';
import { apis } from '@apis/index';
import { REACT_QUERY_KEY } from '@constants/constants';
import { useQuery } from '@tanstack/react-query';

const useUserCommunityQuery = () => {
  const getCommunityList = async (): Promise<CommunityData[]> => {
    const { data } = await apis.user.getUserCommunityList();
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
