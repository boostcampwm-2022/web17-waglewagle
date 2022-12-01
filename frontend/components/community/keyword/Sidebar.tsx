import Image from 'next/image';
import { CommentData } from '../../../types/types';
import styles from '@sass/components/community/keyword/Sidebar.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface SidebarProps {
  id?: string;
  profileURL?: string;
  username?: string;
  createAt?: number;
  contents?: string;
  comments?: CommentData[];
  isClosing: boolean;
}

const Sidebar = ({
  id,
  profileURL,
  username,
  createAt,
  contents,
  comments,
  isClosing,
}: SidebarProps) => {
  return (
    <div className={cx('sidebar', { close: isClosing })}>
      <h4>스레드</h4>
      <div>
        <Image
          className={cx('profile-image')}
          src={profileURL ? profileURL : '/images/default-profile.png'}
          alt='프로필 이미지'
          width={30}
          height={30}
        />
        <div>
          <div className={cx('name-time')}>
            <p>{username}</p>
            <p className={cx('post-time')}>{createAt}</p>
          </div>
          <p>{contents}</p>
        </div>
      </div>
      <p>{comments?.length}개의 댓글</p>
      {comments?.map((comment) => (
        <li key={comment.id}>
          <Image
            className={cx('profile-image')}
            src={'/images/default-profile.png'}
            alt='프로필 이미지'
            width={30}
            height={30}
          />
          <div>
            <div className={cx('name-time')}>
              <p>{comment.username}</p>
              <p className={cx('post-time')}>{comment.createAt}</p>
            </div>
            <p>{comment.content}</p>
          </div>
        </li>
      ))}
    </div>
  );
};

export default Sidebar;
