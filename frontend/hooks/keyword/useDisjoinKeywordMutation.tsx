import { useRouter } from 'next/router';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apis } from '@apis/index';
import { REACT_QUERY_KEY } from '@constants/constants';
import type { JoinKeywordData, MyKeywordData } from '#types/types';

const useDisjoinKeywordMutation = () => {
  const router = useRouter();
  const communityId = router.query.id as string;
  const queryClient = useQueryClient();

  const mutateDisjoinKeyword = async (disjoinKeywordData: JoinKeywordData) => {
    await apis.keyword.disjoinKeyword(disjoinKeywordData);
  };

  const updateMyKeywodList = (
    disjoinKeywordData: JoinKeywordData,
    old?: MyKeywordData[],
  ): MyKeywordData[] => {
    if (!old) {
      return [];
    }

    return old.filter(
      (keywordData) => keywordData.keywordId !== disjoinKeywordData.keywordId,
    );
  };

  const { mutate, isError, error } = useMutation({
    mutationFn: mutateDisjoinKeyword,
    onSuccess: (_, disjoinKeywordData) => {
      queryClient.setQueryData(
        [REACT_QUERY_KEY.MY_KEYWORD_LIST, communityId],
        (old: MyKeywordData[] | undefined) =>
          updateMyKeywodList(disjoinKeywordData, old),
      );

      alert('관심 해제 했습니다.');
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data.message
        : '키워드 추가 중, 알 수 없는 에러가 발생했어요!';
      alert(message);
    },
  });

  return { mutate, isError, error };
};

export default useDisjoinKeywordMutation;
