import styles from '@sass/components/community/MyKeyword.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
interface MyKeywordProps {
  keyword: string;
}

const MyKeyword = ({ keyword }: MyKeywordProps) => {
  return (
    <li className={cx('keyword-item')}>
      {keyword}
      <button className={cx('delete-button')}>x</button>
    </li>
  );
};

export default MyKeyword;
