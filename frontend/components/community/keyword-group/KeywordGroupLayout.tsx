import styles from '@sass/components/community/keyword-group/KeywordLayout.module.scss';
import classnames from 'classnames/bind';
import { ReactNode } from 'react';
const cx = classnames.bind(styles);

interface ThreadLayoutProps {
  children: ReactNode;
}

const KeywordGroupLayout = ({ children }: ThreadLayoutProps) => {
  return <div className={cx('layout')}>{children}</div>;
};

export default KeywordGroupLayout;
