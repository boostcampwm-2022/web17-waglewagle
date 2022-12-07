// TODO: 나중에 /user/me 수정되면 삭제하기
import { useEffect, useState } from 'react';

const useMockUserMe = () => {
  const [userData, setUserData] = useState<string>('');

  useEffect(() => {
    const myCookieRegExp = /user_id=.+;?/;
    const cookieString = document.cookie.match(myCookieRegExp);
    const trimmedUserId =
      cookieString && cookieString[0].split('=')[1].replace(';', '');
    if (trimmedUserId) {
      setUserData(trimmedUserId);
    }
  }, []);

  return userData;
};

export default useMockUserMe;
