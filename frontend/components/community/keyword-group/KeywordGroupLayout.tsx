import { ReactNode } from 'react';
import classnames from 'classnames/bind';
import styles from '@sass/components/community/keyword-group/KeywordLayout.module.scss';
const cx = classnames.bind(styles);

interface ThreadLayoutProps {
  children: ReactNode;
}

const KeywordGroupLayout = ({ children }: ThreadLayoutProps) => {
  return <div className={cx('layout')}>{children}</div>;
};

export default KeywordGroupLayout;
