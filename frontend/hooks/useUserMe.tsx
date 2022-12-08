import { UserData } from '#types/types';
import { REACT_QUERY_KEY } from '@constants/constants';
import { useQuery } from '@tanstack/react-query';
import apis from '../apis/apis';


const useUserMe = (communityId?: string) => {
  const { data } = useQuery<UserData>(
    [REACT_QUERY_KEY.USERME],
    () => {
      const data = apis.getUserData(communityId ?? '');
      return data;
    },
    {
      enabled: !!communityId,
    },
  );

  return data;
};

export default useUserMe;
