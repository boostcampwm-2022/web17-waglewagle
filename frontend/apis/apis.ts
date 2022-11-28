// 일단 스타일 신경 안쓰고 만들어두었읍니다.
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://www.waglewagle.link/api',
});

// TODO : apis 스타일 맞추기
const fetchLogin = async (username: string) => {
  const response = await instance.post('/v1/user/login', {
    data: username,
  });
  return response;
};

const apis = {
  fetchLogin,
};

export default apis;
