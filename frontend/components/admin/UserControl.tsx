import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import useKeywordUserListQuery from '@hooks/keyword/useKeywordUserListQuery';
import styles from '@sass/components/admin/UserControl.module.scss';
const cx = classnames.bind(styles);

const UserControl = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: userList } = useKeywordUserListQuery(id as string);

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
