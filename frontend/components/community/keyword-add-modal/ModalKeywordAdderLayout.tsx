import { ReactNode } from 'react';
import classnames from 'classnames/bind';
import styles from '@sass/components/community/KeywordAddModal.module.scss';

const cx = classnames.bind(styles);

interface ModalKeywordAdderLayoutProps {
  children: ReactNode;
}

const ModalKeywordAdderLayout = ({
  children,
}: ModalKeywordAdderLayoutProps) => {
  return <div className={cx('keyword-add-container')}>{children}</div>;
};

export default ModalKeywordAdderLayout;
