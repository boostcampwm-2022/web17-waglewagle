import { useState } from 'react';
import CommunityItem from './CommunityItem';
import classnames from 'classnames/bind';
import styles from '@sass/components/main/CommunityList.module.scss';
const cx = classnames.bind(styles);

export type Community = {
  id: number;
  profileURL?: string;
  title: string;
  userCount: number;
};

const CommunityList = () => {
  const [communityList] = useState<Community[]>([
    { id: 1, title: '부스트캠프 7기', userCount: 250 },
    { id: 2, title: '부스트캠프 7기', userCount: 250 },
    { id: 3, title: '부스트캠프 7기', userCount: 250 },
    { id: 4, title: '부스트캠프 7기', userCount: 250 },
    { id: 5, title: '부스트캠프 7기', userCount: 250 },
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
