import {
  CommunityList,
  MainHeader,
  MainLayout,
  MainTitle,
} from '@components/main';
import { useState } from 'react';

const Main = () => {
  const [username] = useState('커넥트재단');

  return (
    <MainLayout>
      <MainHeader />
      <MainTitle username={username} />
      <CommunityList />
    </MainLayout>
  );
};

export default Main;
