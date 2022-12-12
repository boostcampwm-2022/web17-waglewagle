import type { ThreadData } from '#types/types';
import { apis } from '@apis/index';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';

interface UseAddCommentMutationProps {
  keywordId: string;
  content: string;
  parentThreadId: string;
}

const useAddCommentMutation = ({
  keywordId,
  content,
  parentThreadId,
}: UseAddCommentMutationProps) => {
  const { mutate } = useMutation<ThreadData, AxiosError>({
    mutationFn: async () => {
      const { data } = await apis.thread.addComments({
        keywordId,
        content,
        parentThreadId,
      });
      return data;
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data.message
        : '알 수 없는 에러가 발생했어요!🫢';
      alert(message);
    },
  });

  return { mutate };
};

export default useAddCommentMutation;
