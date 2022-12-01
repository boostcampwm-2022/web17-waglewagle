import Image from 'next/image';
import { CommentData } from '../../../types/types';
import styles from '@sass/components/community/keyword/Sidebar.module.scss';
import classnames from 'classnames/bind';
import calculateTimeGap from '@utils/calculateTimeGap';
import CloseIcon from '@public/images/close.svg';
import CommentForm from './CommentForm';
const cx = classnames.bind(styles);

interface SidebarProps {
  id?: string;
  profileURL?: string;
  username?: string;
  createAt?: string;
  contents?: string;
  comments?: CommentData[];
  closeSidebar(): void;
}

const Sidebar = ({
  id,
  profileURL,
  username,
  createAt,
  contents,
  comments,
  closeSidebar,
}: SidebarProps) => {
  return (
    <div className={cx('sidebar')}>
      <h4>스레드</h4>
      <div className={cx('sidebar-scroll-wrapper')}>
        <div className={cx('thread')}>
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
              <p className={cx('post-time')}>{calculateTimeGap(createAt!)}</p>
            </div>
            <p>{contents}</p>
          </div>
        </div>
        <p className={cx('comment-count')}>{comments?.length}개의 댓글</p>
        <ul className={cx('comment-list')}>
          {comments?.map((comment) => (
            <li key={comment.id} className={cx('comment')}>
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
                  <p className={cx('post-time')}>
                    {calculateTimeGap(comment.createAt)}
                  </p>
                </div>
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <CommentForm />
      <button className={cx('close-button')} onClick={closeSidebar}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default Sidebar;
