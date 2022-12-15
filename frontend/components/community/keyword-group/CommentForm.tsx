import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import classnames from 'classnames/bind';
import { useAddCommentMutation } from '@hooks/thread';
import styles from '@sass/components/community/keyword-group/CommentForm.module.scss';
import isEmptyInput from '@utils/isEmptyInput';
const cx = classnames.bind(styles);

interface CommentFormProps {
  threadId: string;
  keywordId: string;
}

const CommentForm = ({ threadId, keywordId }: CommentFormProps) => {
  const [contentInputData, setContentInputData] = useState('');

  const { mutate: addComment } = useAddCommentMutation({
    keywordId,
    content: contentInputData,
    parentThreadId: threadId,
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setContentInputData(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isEmptyInput(contentInputData)) {
      return;
    }
    addComment();
    setContentInputData('');
  };

  return (
    <form className={cx('form')} onSubmit={handleSubmit}>
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
