import styles from '@sass/components/community/keyword/CommentForm.module.scss';
import { QueryClient, useMutation } from '@tanstack/react-query';
import classnames from 'classnames/bind';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import apis from '../../../apis/apis';
const cx = classnames.bind(styles);

interface CommentFormProps {
  threadId: string;
  keywordId: string;
}

const queryClient = new QueryClient();

const CommentForm = ({ threadId, keywordId }: CommentFormProps) => {
  const [contentInputData, setContentInputData] = useState('');

  // setQueryData 통해서 데이터 수정 추가
  const { mutate } = useMutation({
    mutationFn: () => apis.addComments(keywordId, contentInputData, threadId),
    onSuccess: () => {
      return queryClient.resetQueries({
        queryKey: ['keywordThreadList', keywordId],
        exact: true,
      });
    },
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setContentInputData(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    mutate();
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
