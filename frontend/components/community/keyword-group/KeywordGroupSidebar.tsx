import { Author, ThreadData } from '#types/types';
import CloseIcon from '@public/images/close.svg';
import styles from '@sass/components/community/keyword/Sidebar.module.scss';
import calculateTimeGap from '@utils/calculateTimeGap';
import classnames from 'classnames/bind';
import Image from 'next/image';
import CommentForm from './CommentForm';
const cx = classnames.bind(styles);

interface SidebarProps {
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
  threadId,
  content,
  childThreadCount,
  childThreads,
  createdAt,
  author: { username, profileImageUrl },
  closeSidebar,
}: SidebarProps) => {
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
                src={'/images/default-profile.png'}
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
                <p>{childThread.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <CommentForm threadId={threadId} />
      <button className={cx('close-button')} onClick={closeSidebar}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default KeywordGroupSidebar;
