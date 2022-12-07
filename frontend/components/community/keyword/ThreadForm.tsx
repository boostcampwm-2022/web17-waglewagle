import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import styles from '@sass/components/community/keyword/ThreadForm.module.scss';
import classnames from 'classnames/bind';
import apis from '../../../apis/apis';
import { useMutation } from '@tanstack/react-query';
const cx = classnames.bind(styles);

const ThreadForm = () => {
  const [contentInputData, setContentInputData] = useState('');
  // setQueryData 통해서 데이터 수정 추가
  const { mutate } = useMutation({
    mutationFn: () => apis.addThread('123', contentInputData),
  });

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContentInputData(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <form className={cx('form')} onSubmit={handleSubmit}>
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
