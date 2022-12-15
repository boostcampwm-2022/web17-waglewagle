import { UserData } from '#types/types';
import { apis } from '@apis/index';
import { REACT_QUERY_KEY } from '@constants/constants';
import { useQuery } from '@tanstack/react-query';

const useUserMe = (communityId?: string) => {
  const { data } = useQuery<UserData>([REACT_QUERY_KEY.USERME], async () => {
    const { data } = await apis.user.getUserData(communityId);
    return data;
  });

  return data;
};

export default useUserMe;
