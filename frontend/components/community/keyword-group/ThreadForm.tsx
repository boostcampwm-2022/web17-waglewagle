import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import classnames from 'classnames/bind';
import { useAddThreadMutation } from '@hooks/thread';
import styles from '@sass/components/community/keyword-group/ThreadForm.module.scss';
import isEmptyInput from '@utils/isEmptyInput';
const cx = classnames.bind(styles);

interface ThreadFormProps {
  keywordId: string;
}

const ThreadForm = ({ keywordId }: ThreadFormProps) => {
  const [contentInputData, setContentInputData] = useState('');

  const { mutate: addThread } = useAddThreadMutation({
    keywordId,
    content: contentInputData,
  });

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContentInputData(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isEmptyInput(contentInputData)) {
      return;
    }
    addThread();
    setContentInputData('');
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
