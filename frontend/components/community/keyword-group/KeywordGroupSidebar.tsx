import { Author, ThreadData } from '#types/types';
import useUserMe from '@hooks/useUserMe';
import CloseIcon from '@public/images/close.svg';
import DeleteIcon from '@public/images/delete.svg';
import styles from '@sass/components/community/keyword/Sidebar.module.scss';
import { useMutation } from '@tanstack/react-query';
import calculateTimeGap from '@utils/calculateTimeGap';
import classnames from 'classnames/bind';
import Image from 'next/image';
import apis from '../../../apis/apis';
import CommentForm from './CommentForm';
const cx = classnames.bind(styles);

interface SidebarProps {
  keywordId: string;
  threadId: string;
  content: string;
  childThreadCount: number;
  childThreads: ThreadData[];
  createdAt: string;
  updatedAt: string;
  author: Author;
  closeSidebar(): void;
}

const KeywordGroupSidebar = ({
  keywordId,
  threadId,
  content,
  childThreadCount,
  childThreads,
  createdAt,
  author: { username, profileImageUrl },
  closeSidebar,
}: SidebarProps) => {
  const userData = useUserMe();
  const { mutate } = useMutation({
    mutationFn: (commentId: string) => apis.deleteThread(commentId),
  });

  return (
    <div className={cx('sidebar')}>
      <h4>스레드</h4>
      <div className={cx('sidebar-scroll-wrapper')}>
        <div className={cx('thread')}>
          <Image
            className={cx('profile-image')}
            src={
              profileImageUrl ? profileImageUrl : '/images/default-profile.png'
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
        </div>
        <p className={cx('comment-count')}>{childThreadCount}개의 댓글</p>
        <ul className={cx('comment-list')}>
          {childThreads?.map((childThread) => (
            <li key={childThread.threadId} className={cx('comment')}>
              <Image
                className={cx('profile-image')}
                src={
                  childThread.author.profileImageUrl === null
                    ? '/images/default-profile.png'
                    : childThread.author.profileImageUrl
                }
                alt='프로필 이미지'
                width={30}
                height={30}
              />
              <div>
                <div className={cx('name-time')}>
                  <p>{childThread.author.username}</p>
                  <p className={cx('post-time')}>
                    {calculateTimeGap(childThread.createdAt)}
                  </p>
                </div>
                <p className={cx('content')}>{childThread.content}</p>
              </div>
              {userData?.userId === childThread.author.userId && (
                <button
                  className={cx('delete-button')}
                  onClick={() => {
                    mutate(childThread.threadId);
                  }}
                >
                  <DeleteIcon />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <CommentForm keywordId={keywordId} threadId={threadId} />
      <button className={cx('close-button')} onClick={closeSidebar}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default KeywordGroupSidebar;
