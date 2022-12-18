import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import { apis } from '@apis/index';
import styles from '@sass/components/admin/UserControl.module.scss';
import { UserData } from '#types/types';

const cx = classnames.bind(styles);

const UserControl = () => {
  const router = useRouter();
  const { id: communityId } = router.query;
  const [userList, setUserList] = useState<UserData[]>([]);

  useEffect(() => {
    if (communityId) {
      apis.user
        .getCommunityUserList(communityId as string)
        .then(({ data }) => setUserList(data));
    }
  }, [communityId]);

  return (
    <>
      <h4>참여 중인 유저</h4>
      <ul className={cx('user-list')}>
        {userList?.map((user) => (
          <li key={user.userId}>{user.username}</li>
        ))}
      </ul>
    </>
  );
};

export default UserControl;
