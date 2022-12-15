import { instance } from './instance';
import type { CommunityData, UserData } from '#types/types';
import type { AxiosResponse } from 'axios';

const getUserData = (communityId?: string): Promise<AxiosResponse<UserData>> =>
  instance.get('/v1/user/me', {
    params: {
      'community-id': communityId,
    },
  });

const getUserCommunityList = (): Promise<AxiosResponse<CommunityData[]>> =>
  instance.get('/v1/community');

const updateLastActivity = () => instance.put('/v1/user/last-activity');

const joinCommunity = (communityId: string) =>
  instance.post('/v1/community-user', {
    communityId,
  });

const updateFirstVisitInCommunity = (communityId: string) =>
  instance.put(`/v1/community-user/${communityId}/first-visit`);

export const user = {
  getUserData,
  getUserCommunityList,
  updateLastActivity,
  joinCommunity,
  updateFirstVisitInCommunity,
};
