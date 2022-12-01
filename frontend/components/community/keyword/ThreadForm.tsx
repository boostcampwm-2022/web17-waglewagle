import { ChangeEventHandler, useState } from 'react';
import styles from '@sass/components/community/keyword/ThreadForm.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const ThreadForm = () => {
  const [contentInputData, setContentInputData] = useState('');

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContentInputData(e.target.value);
  };

  return (
    <form className={cx('form')}>
      <textarea
        placeholder='내용을 입력하세요.'
        className={cx('input')}
        value={contentInputData}
        onChange={handleChange}
      />
      <button className={cx('button')}>글쓰기</button>
    </form>
  );
};

export default ThreadForm;
