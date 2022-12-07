import {
  AddKeywordData,
  AddKeywordResponseData,
  JoinKeywordData,
  KeywordRelatedData,
  UserData,
} from './../types/types';
import axios from 'axios';
import config from '../config';
import { KeywordData } from '../types/types';

const apiInstance = axios.create({
  baseURL: `${config.API_HOST}`,
});

const fetchLogin = async (username: string) => {
  const response = await apiInstance.post('/v1/user/login', {
    data: username,
  });

  return response;
};

const getKeywords = async (id: string): Promise<KeywordData[]> => {
  const response = await apiInstance.get(`/v1/keyword/${id}`);

  return response.data;
};

const joinCommunity = async (communityId: string) => {
  await apiInstance.post('/v1/community-user', {
    communityId,
  });
};

const joinKeyword = async (joinKeywordData: JoinKeywordData) => {
  await apiInstance.post('/v1/keyword/join', {
    data: joinKeywordData,
  });
};

const getUserData = async (communityId: string): Promise<UserData> => {
  const response = await apiInstance.get('/v1/user/me', {
    params: {
      'community-id': communityId,
    },
  });

  return response.data;
};

const getKeywordAssociations = async (
  id: string,
): Promise<KeywordRelatedData[]> => {
  const response = await apiInstance.get('/v1/keyword/associations', {
    params: {
      'keyword-id': id,
    },
  });

  return response.data;
};

const addKeyword = async (
  addKeywordData: AddKeywordData,
): Promise<AddKeywordResponseData> => {
  const response = await apiInstance.post('/v1/keyword', {
    data: addKeywordData,
  });

  return response.data;
};

const apis = {
  fetchLogin,
  getKeywords,
  joinKeyword,
  joinCommunity,
  addKeyword,
  getUserData,
  getKeywordAssociations,
};

export default apis;
