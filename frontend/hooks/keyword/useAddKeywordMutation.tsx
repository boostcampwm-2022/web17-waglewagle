import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apis } from '@apis/index';
import { REACT_QUERY_KEY } from '@constants/constants';
import axios from 'axios';
import type { AddKeywordData, MyKeywordData } from '#types/types';
import type { AxiosError } from 'axios';

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
    const { data } = await apis.keyword.addKeyword(addKeywordData);
    return data;
  };

  const addMyKeyword = (newKeyword: MyKeywordData) => {
    queryClient.setQueryData(
      [REACT_QUERY_KEY.MY_KEYWORD_LIST, communityId],
      (old: MyKeywordData[] | undefined) => {
        if (!old) {
          return [newKeyword];
        }

        return [...old, newKeyword];
      },
    );
  };

  // TODO: 에러처리할 수 있도록 제네릭 타입 지정하기
  const { mutate, isError, error } = useMutation<
    MyKeywordData,
    AxiosError,
    AddKeywordData
  >({
    mutationFn: mutateAddKeyword,
    onSuccess: (addKeywordResponse: MyKeywordData) => {
      addMyKeyword(addKeywordResponse);

      const prevAddedKeyword = {
        keywordId: addKeywordResponse.keywordId,
        keywordName: addKeywordResponse.keywordName,
      };
      handlePrevKeyword(prevAddedKeyword);

      alert(`🚀 ${addKeywordResponse.keywordName} 키워드를 추가했습니다.`);
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data.message
        : '키워드 추가 중, 알 수 없는 에러가 발생했어요!';
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

export default useAddKeywordMutation;
