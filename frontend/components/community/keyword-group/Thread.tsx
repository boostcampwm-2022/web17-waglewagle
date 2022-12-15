import Image from 'next/image';
import classnames from 'classnames/bind';
import { useDeleteThreadMutation } from '@hooks/thread';
import useUserMe from '@hooks/useUserMe';
import CommentIcon from '@public/images/icons/comment.svg';
import DeleteIcon from '@public/images/icons/delete.svg';
import calculateTimeGap from '@utils/calculateTimeGap';
import type { Author, ThreadData } from '#types/types';
import styles from '@sass/components/community/keyword-group/Thread.module.scss';
const cx = classnames.bind(styles);

interface ThreadProps {
  threadId: string;
  content: string;
  childThreadCount: number;
  childThreads: ThreadData[];
  createdAt: string;
  updatedAt: string;
  author: Author;
  openSidebar(threadId: string): void;
}

const Thread = ({
  threadId,
  content,
  childThreadCount,
  createdAt,
  author: { userId, username, profileImageUrl },
  openSidebar,
}: ThreadProps) => {
  const userData = useUserMe();
  const { mutate: deleteThread } = useDeleteThreadMutation();

  return (
    <li className={cx('thread')}>
      <Image
        className={cx('profile-image')}
        src={
          profileImageUrl === null
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
          onClick={() => openSidebar(threadId)}
        >
          {childThreadCount ? <p>{childThreadCount}개의 댓글</p> : null}
          <CommentIcon />
        </button>
        {userId === userData?.userId && (
          <button
            className={cx('delete-button')}
            onClick={() => deleteThread(threadId)}
          >
            <DeleteIcon />
          </button>
        )}
      </div>
    </li>
  );
};

export default Thread;
