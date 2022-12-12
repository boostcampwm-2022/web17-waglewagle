import { ReactNode } from 'react';
import classnames from 'classnames/bind';
import styles from '@sass/components/community/CommunityLayout.module.scss';

const cx = classnames.bind(styles);

interface CommunityLayoutProps {
  children: ReactNode;
}

const CommunityLayout = ({ children }: CommunityLayoutProps) => {
  return <div className={cx('layout')}>{children}</div>;
};

export default CommunityLayout;
