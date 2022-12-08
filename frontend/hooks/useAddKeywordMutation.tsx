import { AddKeywordData, MyKeywordData } from '#types/types';
import { REACT_QUERY_KEY } from '@constants/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import apis from '../apis/apis';

// 반환값, 요청 URL이 모두 다르기 때문에 join과 add 쿼리를 분리함.
const useAddKeywordMutation = (
  handlePrevKeyword: (prevKeyword: MyKeywordData) => void,
) => {
  const router = useRouter();
  const communityId = router.query.id as string;
  const queryClient = useQueryClient();

  const mutateAddKeyword = async (
    addKeywordData: AddKeywordData,
  ): Promise<MyKeywordData> => {
    const data = await apis.addKeyword(addKeywordData);
    return data;
  };

  // TODO: 에러처리할 수 있도록 제네릭 타입 지정하기
  const { mutate, isError, error } = useMutation({
    mutationFn: mutateAddKeyword,
    onSuccess: (addKeywordResponse: MyKeywordData) => {
      queryClient.setQueryData(
        [REACT_QUERY_KEY.MY_KEYWORD_LIST, communityId],
        (old: MyKeywordData[] | undefined) => {
          if (!old) {
            return [addKeywordResponse];
          }

          return [...old, addKeywordResponse];
        },
      );

      const prevAddedKeyword: MyKeywordData = {
        keywordId: addKeywordResponse.keywordId,
        keywordName: addKeywordResponse.keywordName,
      };
      handlePrevKeyword(prevAddedKeyword);
    },
  });

  // 후에 예외처리가 쉽도록 isError와 error를 내보내준다.
  return {
    mutate,
    isError,
    error,
  };
};

export default useAddKeywordMutation;
