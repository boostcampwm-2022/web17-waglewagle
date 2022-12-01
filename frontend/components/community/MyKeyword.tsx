import { MouseEventHandler } from 'react';
import styles from '@sass/components/community/MyKeyword.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
interface MyKeywordProps {
  handleDeleteClick: MouseEventHandler<HTMLButtonElement>;
  keyword: string;
}

const MyKeyword = ({ keyword, handleDeleteClick }: MyKeywordProps) => {
  return (
    <li className={cx('keyword-item')}>
      {keyword}
      <button onClick={handleDeleteClick} className={cx('delete-button')}>
        x
      </button>
    </li>
  );
};

export default MyKeyword;
