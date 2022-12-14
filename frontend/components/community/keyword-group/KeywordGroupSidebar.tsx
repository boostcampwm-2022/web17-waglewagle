import { useEffect, useState } from 'react';
import Image from 'next/image';
import classnames from 'classnames/bind';
import { useDeleteThreadMutation, useThreadListQuery } from '@hooks/thread';
import useUserMe from '@hooks/useUserMe';
import CloseIcon from '@public/images/icons/close.svg';
import DeleteIcon from '@public/images/icons/delete.svg';
import calculateTimeGap from '@utils/calculateTimeGap';
import CommentForm from './CommentForm';
import type { ThreadData } from '#types/types';
import styles from '@sass/components/community/keyword-group/Sidebar.module.scss';
const cx = classnames.bind(styles);

interface SidebarProps {
  isOpen: boolean;
  keywordId: string;
  threadId: string;
  closeSidebar(): void;
}

const KeywordGroupSidebar = ({
  isOpen,
  keywordId,
  threadId,
  closeSidebar,
}: SidebarProps) => {
  const [threadData, setThreadData] = useState<ThreadData>();
  const userData = useUserMe();
  const { data: threadList } = useThreadListQuery(keywordId);
  const { mutate: deleteComment } = useDeleteThreadMutation();

  useEffect(() => {
    if (threadList) {
      setThreadData(threadList?.find((thread) => thread.threadId === threadId));
    }
  }, [threadId, threadList]);

  if (!isOpen || !threadList) {
    return <></>;
  }

  return (
    <div className={cx('sidebar')}>
      <h4>스레드</h4>
      <div className={cx('sidebar-scroll-wrapper')}>
        <div className={cx('thread')}>
          <Image
            className={cx('profile-image')}
            src={
              threadData?.author.profileImageUrl
                ? threadData?.author.profileImageUrl
                : '/images/default-profile.png'
            }
            alt='프로필 이미지'
            width={30}
            height={30}
          />
          <div>
            <div className={cx('name-time')}>
              <p>{threadData?.author.username}</p>
              <p className={cx('post-time')}>
                {calculateTimeGap(threadData?.createdAt as string)}
              </p>
            </div>
            <p>{threadData?.content}</p>
          </div>
        </div>
        <p className={cx('comment-count')}>
          {threadData?.childThreadCount}개의 댓글
        </p>
        <ul className={cx('comment-list')}>
          {threadData?.childThreads.map((childThread) => (
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
              <div className={cx('right')}>
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
                    deleteComment(childThread.threadId);
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
