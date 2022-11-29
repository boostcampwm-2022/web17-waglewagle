// 일단 스타일 신경 안쓰고 만들어두었읍니다.
import axios from 'axios';
import config from '../config';
import { KeywordData } from '../types/types';

const apiInstance = axios.create({
  baseURL: `${config.API_HOST}`,
});

// TODO : apis 스타일 맞추기
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

const apis = {
  fetchLogin,
  getKeywords,
  getUserData,
};

export default apis;
