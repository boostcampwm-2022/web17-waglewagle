import classnames from 'classnames/bind';
import useUserCommunityQuery from '@hooks/useUserCommunityQuery';
import CommunityItem from './CommunityItem';
import styles from '@sass/components/main/CommunityList.module.scss';

const cx = classnames.bind(styles);

const CommunityList = () => {
  const { data: communityList } = useUserCommunityQuery();

  return (
    <ul className={cx('community-list')}>
      {communityList.map(({ communityId, title, memberCount }) => (
        <CommunityItem
          id={communityId}
          title={title}
          memberCount={memberCount} // API에 반영되지 않아서 우선 부스트캠프 인원 수를 하드코딩함.
          key={communityId}
        />
      ))}
    </ul>
  );
};

export default CommunityList;
