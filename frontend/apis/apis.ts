import type { CommunityData, KeywordUser, UserData } from '#types/types';
import axios from 'axios';
import config from '../config';

export const apiInstance = axios.create({
  baseURL: `${config.API_HOST}`,
});

const fetchLogin = async (username: string) => {
  const response = await apiInstance.post('/v1/user/login', {
    data: username,
  });

  return response;
};

const getUserCommunityList = async (): Promise<CommunityData[]> => {
  const response = await apiInstance.get('/v1/community');

  return response.data;
};

const joinCommunity = async (communityId: string) => {
  await apiInstance.post('/v1/community-user', {
    communityId,
  });
};

const updateFirstVisitInCommunity = async (communityId: string) => {
  await apiInstance.put(`/v1/community-user/${communityId}/first-visit`);
};

// isFirstInCommunity가 없으면 isFirstLogin이 항상 null
const getUserData = async (communityId?: string): Promise<UserData> => {
  const response = await apiInstance.get('/v1/user/me', {
    params: {
      'community-id': communityId,
    },
  });

  return response.data;
};

const getKeywordUsers = async (keywordId: string): Promise<KeywordUser[]> => {
  const response = await apiInstance.get(
    `/v1/user/keyword?keyword-id=${keywordId}`,
  );

  return response.data;
};

const apis = {
  fetchLogin,
  getUserCommunityList,
  joinCommunity,
  updateFirstVisitInCommunity,
  getUserData,
  getKeywordUsers,
};

export default apis;
