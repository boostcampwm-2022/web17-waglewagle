import {
  AddKeywordData,
  AddKeywordResponseData,
  JoinKeywordData,
  KeywordRelatedData,
  KeywordUser,
  MyKeywordData,
  ThreadData,
  UserData,
} from './../types/types';
import axios, { AxiosError } from 'axios';
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

// isFirstInCommunity가 없으면 isFirstLogin이 항상 null
const getUserData = async (communityId?: string): Promise<UserData> => {
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
  const response = await apiInstance.post('/v1/keyword', addKeywordData);

  return response.data;
};

const joinKeyword = async (joinKeywordData: JoinKeywordData) => {
  await apiInstance.post('/v1/keyword/join', joinKeywordData);
};

const getKeywordThreads = async (keywordId: string): Promise<ThreadData[]> => {
  const response = await apiInstance.get(
    `/v1/thread/keyword?keyword-id=${keywordId}`,
  );

  return response.data;
};

const getKeywordUsers = async (keywordId: string): Promise<KeywordUser[]> => {
  const response = await apiInstance.get(
    `/v1/user/keyword?keyword-id=${keywordId}`,
  );

  return response.data;
};

const addThread = async (keywordId: string, content: string) => {
  const response = await apiInstance.post('/v1/thread', {
    keywordId,
    content,
  });

  return response.data;
};

const addComments = async (
  keywordId: string,
  content: string,
  parentThreadId: string,
) => {
  const response = await apiInstance.post('/v1/thread', {
    keywordId,
    content,
    parentThreadId,
  });

  return response.data;
};

const deleteThread = async (threadId: string) => {
  const response = await apiInstance.delete('/v1/thread', {
    data: { threadId },
  });

  return response.data;
};

const getMyKeywordList = async (
  communityId: string,
): Promise<MyKeywordData[]> => {
  const response = await apiInstance.get(`/v1/keyword/${communityId}`);

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
  getKeywordThreads,
  getKeywordUsers,
  addThread,
  addComments,
  deleteThread,
  getMyKeywordList,
};

export default apis;
