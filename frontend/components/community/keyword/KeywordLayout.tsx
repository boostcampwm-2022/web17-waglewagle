import { ReactNode } from 'react';
import styles from '@sass/components/community/keyword/KeywordLayout.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface ThreadLayoutProps {
  children: ReactNode;
}

const KeywordLayout = ({ children }: ThreadLayoutProps) => {
  return <div className={cx('layout')}>{children}</div>;
};

export default KeywordLayout;
