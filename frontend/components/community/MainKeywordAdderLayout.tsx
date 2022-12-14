import { ReactNode } from 'react';
import styles from '@sass/components/community/MainKeywordHandlerLayout.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

interface MainKeywordHandlerLayoutProps {
  children: ReactNode;
}

const MainKeywordHandlerLayout = ({
  children,
}: MainKeywordHandlerLayoutProps) => {
  return <div className={cx('layout')}>{children}</div>;
};

export default MainKeywordHandlerLayout;
