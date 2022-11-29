// 일단 스타일 신경 안쓰고 만들어두었읍니다.
import axios from 'axios';
import config from '../config';

const instance = axios.create({
  baseURL: `${config.API_HOST}`,
});

// TODO : apis 스타일 맞추기
const fetchLogin = async (username: string) => {
  const response = await instance.post('/v1/user/login', {
    data: username,
  });
  return response;
};

const getKeywords = async () => {
  const response = await instance.get('/v1/keyword/1');

  return response;
};

const apis = {
  fetchLogin,
  getKeywords,
};

export default apis;
