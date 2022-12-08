import {
  AddKeywordData,
  AddKeywordResponseData,
  JoinKeywordData,
  KeywordData,
  KeywordRelatedData,
  KeywordUser,
  ThreadData,
  UserData,
} from '#types/types';
import axios from 'axios';
import config from '../config';

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

const deleteKeyword = async (communityId: string, keywordIdList: string[]) => {
  const response = await apiInstance.delete('/v1/thread', {
    data: {
      communityId,
      keywordIdList,
    },
  });

  return response.data;
};

const apis = {
  fetchLogin,
  getKeywords,
  joinKeyword,
  addKeyword,
  getUserData,
  getKeywordAssociations,
  getKeywordThreads,
  getKeywordUsers,
  addThread,
  addComments,
  deleteThread,
  deleteKeyword,
};

export default apis;
