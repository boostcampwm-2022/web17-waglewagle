import { useQuery } from '@tanstack/react-query';
import { apis } from '@apis/index';
import { REACT_QUERY_KEY } from '@constants/constants';
import type { UserData } from '#types/types';

const useUserMe = (communityId?: string) => {
  const { data } = useQuery<UserData>([REACT_QUERY_KEY.USERME], async () => {
    const { data } = await apis.user.getUserData(communityId);
    return data;
  });

  return data;
};

export default useUserMe;
