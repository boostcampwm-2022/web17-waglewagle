// TODO: 나중에 /user/me 수정되면 삭제하기
import { useEffect, useState } from 'react';

const useMockUserMe = () => {
  const [userData, setUserData] = useState<boolean>(false);

  useEffect(() => {
    const myCookieRegExp = /user_id/g;
    const cookieString = document.cookie.match(myCookieRegExp);
    if (cookieString) {
      setUserData(true);
    }
  }, []);

  return userData;
};

export default useMockUserMe;
