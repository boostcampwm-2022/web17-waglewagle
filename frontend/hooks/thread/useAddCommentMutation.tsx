import { apis } from '@apis/index';
import { QueryClient, useMutation } from '@tanstack/react-query';

const useAddCommentMutation = (
  keywordId: string,
  content: string,
  parentThreadId: string,
) => {
  const queryClient = new QueryClient();

  const { mutate } = useMutation({
    mutationFn: () =>
      apis.thread.addComments({
        keywordId,
        content,
        parentThreadId,
      }),
    onSuccess: () => {
      return queryClient.resetQueries({
        queryKey: ['keywordThreadList', keywordId],
        exact: true,
      });
    },
  });

  return { mutate };
};

export default useAddCommentMutation;
