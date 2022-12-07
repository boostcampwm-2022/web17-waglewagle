import { AddKeywordData, MyKeywordData } from '#types/types';
import { REACT_QUERY_KEY } from '@constants/constants';
import { QueryClient, useMutation } from '@tanstack/react-query';
import apis from '../apis/apis';

const useAddKeywordMutation = () => {
  const queryClient = new QueryClient();

  const addMyKeyword = async (
    addKeywordData: AddKeywordData,
  ): Promise<MyKeywordData> => {
    const data = await apis.addKeyword(addKeywordData);
    return data;
  };

  const { mutate, isError, error } = useMutation(addMyKeyword, {
    onSuccess: (addKeywordResponse) => {
      queryClient.setQueryData(
        [REACT_QUERY_KEY.MY_KEYWORD_LIST],
        (old: MyKeywordData[] | undefined) => {
          if (!old) {
            return [addKeywordResponse];
          }

          [...old, addKeywordResponse];
        },
      );
    },
  });

  // 후에 예외처리가 쉽도록 isError와 error를 내보내준다.
  return {
    addKeywordMutate: mutate,
    isError,
    error,
  };
};

export default useAddKeywordMutation;
