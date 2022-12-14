import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apis } from '@apis/index';
import { REACT_QUERY_KEY } from '@constants/constants';
import axios from 'axios';
import type { DisjoinKeywordData, MyKeywordData } from '#types/types';
import type { AxiosError } from 'axios';

const useDisjoinKeywordMutation = () => {
  const router = useRouter();
  const communityId = router.query.id as string;
  const queryClient = useQueryClient();

  const mutateDisjoinKeyword = async (
    disjoinKeywordData: DisjoinKeywordData,
  ) => {
    await apis.keyword.disjoinKeyword(disjoinKeywordData);
  };

  const updateMyKeywodList = (
    disjoinKeywordData: DisjoinKeywordData,
    old?: MyKeywordData[],
  ): MyKeywordData[] => {
    if (!old) {
      return [];
    }

    return old.filter(
      (keywordData) => keywordData.keywordId !== disjoinKeywordData.keywordId,
    );
  };

  const setNewKeywordList = (disjoinKeywordData: DisjoinKeywordData) => {
    queryClient.setQueryData(
      [REACT_QUERY_KEY.MY_KEYWORD_LIST, communityId],
      (old: MyKeywordData[] | undefined) =>
        updateMyKeywodList(disjoinKeywordData, old),
    );
  };

  const { mutate, isError, error } = useMutation<
    void,
    AxiosError,
    DisjoinKeywordData
  >({
    mutationFn: mutateDisjoinKeyword,
    onSuccess: (_, disjoinKeywordData) => {
      setNewKeywordList(disjoinKeywordData);
      alert('관심 해제 되었습니다.');
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data.message
        : '키워드 관심 해제 중, 알 수 없는 에러가 발생했어요!';
      alert(message);
    },
  });

  return { mutate, isError, error };
};

export default useDisjoinKeywordMutation;
