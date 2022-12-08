import { useState } from 'react';
import CommunityItem from './CommunityItem';
import classnames from 'classnames/bind';
import styles from '@sass/components/main/CommunityList.module.scss';
import { MVP_DEFAULT } from '@constants/constants';
const cx = classnames.bind(styles);

export type Community = {
  id: string;
  profileURL?: string;
  title: string;
  userCount: number;
};

const CommunityList = () => {
  const [communityList] = useState<Community[]>([
    {
      id: MVP_DEFAULT.COMMUNITY_ID,
      title: '부스트캠프 웹·모바일 7기',
      userCount: 360,
    },
  ]);

  return (
    <ul className={cx('community-list')}>
      {communityList.map(({ id, title, userCount }) => (
        <CommunityItem id={id} title={title} userCount={userCount} key={id} />
      ))}
    </ul>
  );
};

export default CommunityList;
