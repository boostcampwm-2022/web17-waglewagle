import useKeywordUserListQuery from '@hooks/useKeywordUserListQuery';
import styles from '@sass/components/admin/UserControl.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const UserControl = () => {
  const { data: userList } = useKeywordUserListQuery('123');

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
