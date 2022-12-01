import { REACT_QUERY_KEY } from '@constants/constants';
import { useQuery } from '@tanstack/react-query';
import apis from '../apis/apis';
import { UserData } from '../types/types';

const useUserMe = () => {
  const fetchUserMe = async () => {
    const data = await apis.getUserMe();
    return data;
  };
  const { data } = useQuery<UserData>([REACT_QUERY_KEY.USERME], fetchUserMe);

  return data;
};

export default useUserMe;
