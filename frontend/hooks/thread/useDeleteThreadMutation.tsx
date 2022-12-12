import type { ThreadData } from '#types/types';
import { apis } from '@apis/index';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';

const useDeleteThreadMutation = () => {
  const { mutate } = useMutation<ThreadData, AxiosError, string>({
    mutationFn: async (threadId: string) => {
      const { data } = await apis.thread.deleteThread({ threadId });
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

export default useDeleteThreadMutation;
