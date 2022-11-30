import styles from '@sass/components/community/thread/ThreadLayout.module.scss';
import classnames from 'classnames/bind';
import { ReactNode } from 'react';
const cx = classnames.bind(styles);

interface ThreadLayoutProps {
  children: ReactNode;
}

const ThreadLayout = ({ children }: ThreadLayoutProps) => {
  return <div className={cx('layout')}>{children}</div>;
};

export default ThreadLayout;
