import { KeywordAssociationData } from './../types/types';
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

const getUserData = async () => {
  const response = await apiInstance.get('/v1/user/me');

  return response;
};

const getKeywordAssociations = async (
  id: string,
): Promise<KeywordAssociationData[]> => {
  const response = await apiInstance.get('/v1/keyword/associations', {
    params: {
      'keyword-id': id,
    },
  });

  return response.data;
};

const apis = {
  fetchLogin,
  getKeywords,
  getUserData,
  getKeywordAssociations,
};

export default apis;
