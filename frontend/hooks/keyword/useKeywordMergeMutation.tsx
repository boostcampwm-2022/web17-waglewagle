import { useMutation } from '@tanstack/react-query';
import { apis } from '@apis/index';
import axios from 'axios';
import type { ThreadData } from '#types/types';
import type { AxiosError } from 'axios';

interface UseKeywordMergeMutationProps {
  communityId: string;
  destinationKeywordId: string;
  sourceKeywordIdList: string[];
  handleSuccess: () => void;
}

const useKeywordMergeMutation = ({
  communityId,
  destinationKeywordId,
  sourceKeywordIdList,
  handleSuccess,
}: UseKeywordMergeMutationProps) => {
  const { mutate } = useMutation<ThreadData, AxiosError>({
    mutationFn: async () => {
      const { data } = await apis.keyword.mergeKeyword({
        communityId,
        destinationKeywordId,
        sourceKeywordIdList,
      });
      return data;
    },
    onSuccess: () => {
      handleSuccess();
      alert('키워드가 병합되었습니다.');
      location.reload();
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

export default useKeywordMergeMutation;
