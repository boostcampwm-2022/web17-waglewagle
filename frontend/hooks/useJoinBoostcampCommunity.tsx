import { apis } from '@apis/index';
import { useEffect } from 'react';
import useUserCommunityQuery from './useUserCommunityQuery';
import useUserMe from './useUserMe';

// 데모를 위해 로그인 시, 전부 부캠으로 가입시킴. 핵심기능 체험이 데모의 목표였기 때문에 불필요한 상호작용을 줄임.
const useJoinBoostcampCommunity = () => {
  const userData = useUserMe();
  const { data: userCommunityList } = useUserCommunityQuery();

  useEffect(() => {
    if (!userData) {
      return;
    }

    if (!userCommunityList.some((community) => community.communityId === '1')) {
      apis.user.joinCommunity('1');
    }
  }, [userData]);
};

export default useJoinBoostcampCommunity;
