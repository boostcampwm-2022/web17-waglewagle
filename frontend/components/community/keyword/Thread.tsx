import styles from '@sass/components/community/keyword/Thread.module.scss';
import classnames from 'classnames/bind';
import Image from 'next/image';
import { CommentData, ThreadData } from '../../../types/types';
const cx = classnames.bind(styles);

interface ThreadProps {
  id: string;
  username: string;
  profileURL?: string;
  createAt: number;
  contents: string;
  comments: CommentData[];
  toggleSidebar(thread: ThreadData): void;
}

const Thread = ({
  id,
  profileURL,
  username,
  createAt,
  contents,
  comments,
  toggleSidebar,
}: ThreadProps) => {
  return (
    <li
      className={cx('thread')}
      onClick={() =>
        toggleSidebar({
          id,
          profileURL,
          username,
          createAt,
          contents,
          comments,
        })
      }
    >
      <Image
        className={cx('profile-image')}
        src={
          profileURL === undefined ? '/images/default-profile.png' : profileURL
        }
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
      <div className={cx('buttons')}>
        <button className={cx('comment-button')}>댓글</button>
        <button className={cx('delete-button')}>삭제</button>
      </div>
    </li>
  );
};

export default Thread;
