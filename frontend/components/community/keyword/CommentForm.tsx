import { ChangeEventHandler, useState } from 'react';
import styles from '@sass/components/community/keyword/CommentForm.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const CommentForm = () => {
  const [contentInputData, setContentInputData] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setContentInputData(e.target.value);
  };

  return (
    <form className={cx('form')}>
      <input
        type='text'
        placeholder='내용을 입력하세요.'
        className={cx('input')}
        value={contentInputData}
        onChange={handleChange}
      />
      <button className={cx('button')}>글쓰기</button>
    </form>
  );
};

export default CommentForm;
