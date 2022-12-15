import Image from 'next/image';
import classnames from 'classnames/bind';
import { MVP_DEFAULT } from '@constants/constants';
import styles from '@sass/components/main/CommunityItem.module.scss';
const cx = classnames.bind(styles);

interface CommunityItemProps {
  id: string;
  profileURL?: string;
  title: string;
  userCount: number;
}

const CommunityItem = ({
  profileURL,
  title,
  userCount,
}: CommunityItemProps) => {
  return (
    <li className={cx('community-item')}>
      <a href={MVP_DEFAULT.MAIN_PROFILE_URL}>
        <div className={cx('profile-wrapper')}>
          <Image
            src={profileURL ? profileURL : '/images/boostcamp.png'}
            alt='부스트캠프 이미지'
            fill
          />
        </div>
      </a>
      <h3 className={cx('title')}>{title}</h3>
      <p className={cx('user-count')}>{userCount}명 참여 중</p>
    </li>
  );
};

export default CommunityItem;
