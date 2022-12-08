import { MyKeywordData } from '#types/types';
import { REACT_QUERY_KEY } from '@constants/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import apis from '../apis/apis';

// 반환값, 요청 URL이 모두 다르기 때문에 join과 add 쿼리를 분리함.
const useJoinKeywordMutation = (
  handlePrevKeyword: (prevKeyword: MyKeywordData) => void,
) => {
  const router = useRouter();
  const communityId = router.query.id as string;
  const queryClient = useQueryClient();

  // mutationFn
  const joinMyKeyword = async (joinKeywordFullData: {
    keywordId: string;
    communityId: string;
    keywordName: string;
  }) => {
    const joinKeywordData = {
      keywordId: joinKeywordFullData.keywordId,
      communityId: joinKeywordFullData.communityId,
    };
    await apis.joinKeyword(joinKeywordData);
  };

  const { mutate, isError, error } = useMutation(joinMyKeyword, {
    onSuccess: (_, joinKeywordFullData) => {
      const prevKeywordData: MyKeywordData = {
        keywordId: joinKeywordFullData.keywordId,
        keywordName: joinKeywordFullData.keywordName,
      };
      handlePrevKeyword(prevKeywordData);

      // MykeywordList에 방금 추가한 단어를 추가함.
      queryClient.setQueryData(
        [REACT_QUERY_KEY.MY_KEYWORD_LIST, communityId],
        (old: MyKeywordData[] | undefined) => {
          if (!old) {
            return [prevKeywordData];
          }

          return [...old, prevKeywordData];
        },
      );
    },
  });

  // 후에 예외처리가 쉽도록 isError와 error를 내보내준다.
  return {
    mutate,
    isError,
    error,
  };
};

export default useJoinKeywordMutation;
