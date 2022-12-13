import { MyKeywordData } from '#types/types';
import { apis } from '@apis/index';
import { REACT_QUERY_KEY } from '@constants/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

// 반환값, 요청 URL이 모두 다르기 때문에 join과 add 쿼리를 분리함.
const useJoinKeywordMutation = (
  handlePrevKeyword?: (prevKeyword: MyKeywordData) => void,
) => {
  const router = useRouter();
  const communityId = router.query.id as string;
  const queryClient = useQueryClient();

  // mutationFn
  const mutateJoinKeyword = async (joinKeywordFullData: {
    keywordId: string;
    communityId: string;
    keywordName: string;
  }) => {
    const joinKeywordData = {
      keywordId: joinKeywordFullData.keywordId,
      communityId: joinKeywordFullData.communityId,
    };
    await apis.keyword.joinKeyword(joinKeywordData);
  };

  const { mutate, isError, error } = useMutation({
    mutationFn: mutateJoinKeyword,
    onSuccess: (_, joinKeywordFullData) => {
      const prevKeywordData: MyKeywordData = {
        keywordId: joinKeywordFullData.keywordId,
        keywordName: joinKeywordFullData.keywordName,
      };
      handlePrevKeyword && handlePrevKeyword(prevKeywordData);

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

      alert(`🎊 ${joinKeywordFullData.keywordName}을 관심사에 추가했습니다!`);
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data.message
        : '키워드 관심사 추가 중, 알 수 없는 에러가 발생했어요!';
      alert(message);
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
