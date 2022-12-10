import { apis } from '@apis/index';
import { useMutation } from '@tanstack/react-query';

const useDeleteThreadMutation = () => {
  const { mutate } = useMutation({
    mutationFn: (threadId: string) => apis.thread.deleteThread({ threadId }),
  });

  return { mutate };
};

export default useDeleteThreadMutation;
