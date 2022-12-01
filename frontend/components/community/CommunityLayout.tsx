import { ReactNode } from 'react';
import styles from '@sass/components/community/CommunityLayout.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface CommunityLayoutProps {
  children: ReactNode;
}

const CommunityLayout = ({ children }: CommunityLayoutProps) => {
  return <div className={cx('layout')}>{children}</div>;
};

export default CommunityLayout;
