import { ThreadData } from '#types/types';
import useThreadListQuery from '@hooks/useThreadListQuery';
import useUserMe from '@hooks/useUserMe';
import CloseIcon from '@public/images/close.svg';
import DeleteIcon from '@public/images/delete.svg';
import styles from '@sass/components/community/keyword/Sidebar.module.scss';
import { useMutation } from '@tanstack/react-query';
import calculateTimeGap from '@utils/calculateTimeGap';
import classnames from 'classnames/bind';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import apis from '../../../apis/apis';
import CommentForm from './CommentForm';
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
  const { mutate } = useMutation({
    mutationFn: (commentId: string) => apis.deleteThread(commentId),
    onSuccess: () => {
      setThreadData(threadList?.find((thread) => thread.threadId === threadId));
    },
  });

  useEffect(() => {
    setThreadData(threadList?.find((thread) => thread.threadId === threadId));
  }, [threadList, threadId, isOpen]);

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
