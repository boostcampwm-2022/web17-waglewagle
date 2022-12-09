import { Author, ThreadData } from '#types/types';
import { apis } from '@apis/index';
import useUserMe from '@hooks/useUserMe';
import CommentIcon from '@public/images/comment.svg';
import DeleteIcon from '@public/images/delete.svg';
import styles from '@sass/components/community/keyword/Thread.module.scss';
import { useMutation } from '@tanstack/react-query';
import calculateTimeGap from '@utils/calculateTimeGap';
import classnames from 'classnames/bind';
import Image from 'next/image';
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
  createdAt,
  author: { userId, username, profileImageUrl },
  openSidebar,
}: ThreadProps) => {
  // setQueryData 통해서 데이터 수정 추가
  const { mutate } = useMutation({
    mutationFn: () => apis.thread.deleteThread({ threadId }),
  });

  const userData = useUserMe();

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
          <CommentIcon />
        </button>
        {userId === userData?.userId && (
          <button
            className={cx('delete-button')}
            onClick={() => {
              mutate();
            }}
          >
            <DeleteIcon />
          </button>
        )}
      </div>
    </li>
  );
};

export default Thread;
