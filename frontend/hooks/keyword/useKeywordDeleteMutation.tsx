import type { ThreadData } from '#types/types';
import { apis } from '@apis/index';
import { REACT_QUERY_KEY } from '@constants/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';

interface UseKeywordDeleteMutationProps {
  communityId: string;
  keywordIdList: string[];
  handleSuccess: () => void;
}

const useKeywordDeleteMutation = ({
  communityId,
  keywordIdList,
  handleSuccess,
}: UseKeywordDeleteMutationProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<ThreadData, AxiosError>({
    mutationFn: async () => {
      const { data } = await apis.keyword.deleteKeyword({
        communityId,
        keywordIdList,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEY.KEYWORD, communityId]);
      handleSuccess();
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

export default useKeywordDeleteMutation;
