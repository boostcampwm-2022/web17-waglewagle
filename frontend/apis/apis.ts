import axios from 'axios';

export const testApi = () => {
  axios
    .get('http://www.waglewagle.link/demo')
    .then((response) => {
      alert(`서버에서 값을 잘 받아왔습니다. 값 : ${response.data.TestKey}`);
    })
    .catch(() => {
      alert('서버 통신에 실패했습니다.');
    });
};
