import { ReactNode } from 'react';

interface CommunityLayoutProps {
  children: ReactNode;
}

const CommunityLayout = ({ children }: CommunityLayoutProps) => {
  return <div>{children}</div>;
};

export default CommunityLayout;
