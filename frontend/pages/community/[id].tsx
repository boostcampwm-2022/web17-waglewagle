import {
  AutoComplete,
  CommunityHeader,
  CommunityLayout,
} from '@components/community';

const Community = () => {
  return (
    <CommunityLayout>
      <CommunityHeader title='부스트캠프 7기' />
      <AutoComplete />
    </CommunityLayout>
  );
};

export default Community;
