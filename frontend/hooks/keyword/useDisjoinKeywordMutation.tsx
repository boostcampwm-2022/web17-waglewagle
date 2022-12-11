import { JoinKeywordData, MyKeywordData } from '#types/types';
import { apis } from '@apis/index';
import { REACT_QUERY_KEY } from '@constants/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

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
    },
  });

  return { mutate, isError, error };
};

export default useDisjoinKeywordMutation;
