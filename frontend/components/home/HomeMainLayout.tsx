import React from 'react';

interface HomeMainLayoutProps {
  children: React.ReactNode;
}

const HomeMainLayout = ({ children }: HomeMainLayoutProps) => {
  return <main>{children}</main>;
};

export default HomeMainLayout;
