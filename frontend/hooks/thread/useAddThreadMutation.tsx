import { apis } from '@apis/index';
import { useMutation } from '@tanstack/react-query';

const useAddThreadMutation = (keywordId: string, content: string) => {
  const { mutate } = useMutation({
    mutationFn: () =>
      apis.thread.addThread({
        keywordId,
        content,
      }),
  });

  return { mutate };
};

export default useAddThreadMutation;
