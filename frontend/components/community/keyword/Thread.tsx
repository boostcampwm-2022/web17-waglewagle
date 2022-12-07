import styles from '@sass/components/community/keyword/Thread.module.scss';
import classnames from 'classnames/bind';
import Image from 'next/image';
import DeleteIcon from '@public/images/delete.svg';
import CommentIcon from '@public/images/comment.svg';
import { Author, ThreadData } from '../../../types/types';
import calculateTimeGap from '@utils/calculateTimeGap';
const cx = classnames.bind(styles);

interface ThreadProps {
  threadId: string;
  content: string;
  childThreadCount: number;
  childThreads: ThreadData[];
  createdAt: string;
  updatedAt: string;
  author: Author;
  openSidebar(thread: ThreadData): void;
}

const Thread = ({
  threadId,
  content,
  childThreadCount,
  childThreads,
  createdAt,
  updatedAt,
  author: { userId, username, profileImageUrl },
  openSidebar,
}: ThreadProps) => {
  return (
    <li className={cx('thread')}>
      <Image
        className={cx('profile-image')}
        src={
          profileImageUrl === undefined
            ? '/images/default-profile.png'
            : profileImageUrl
        }
        alt='프로필 이미지'
        width={30}
        height={30}
      />

      <div>
        <div className={cx('name-time')}>
          <p>{username}</p>
          <p className={cx('post-time')}>{calculateTimeGap(createdAt)}</p>
        </div>
        <p>{content}</p>
      </div>
      <div className={cx('buttons')}>
        <button
          className={cx('comment-button')}
          onClick={() =>
            openSidebar({
              threadId,
              content,
              childThreadCount,
              childThreads,
              createdAt,
              updatedAt,
              author: { userId, username, profileImageUrl },
            })
          }
        >
          <CommentIcon />
        </button>
        <button className={cx('delete-button')}>
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};

export default Thread;
