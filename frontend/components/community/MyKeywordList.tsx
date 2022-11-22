import styles from '@sass/components/community/MyKeywordList.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface MyKeywordListProps {
  children: React.ReactNode;
}

const MyKeywordList = ({ children }: MyKeywordListProps) => {
  return <ol className={cx('list-container')}>{children}</ol>;
};

export default MyKeywordList;
