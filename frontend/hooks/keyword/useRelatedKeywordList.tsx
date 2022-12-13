import { MyKeywordData } from '#types/types';
import { apis } from '@apis/index';
import { REACT_QUERY_KEY } from '@constants/constants';
import { useQuery } from '@tanstack/react-query';

const useRelatedKeywordList = (prevKeyword: MyKeywordData) => {
  const getRelatedKeywordList = async () => {
    const { data } = await apis.keyword.getKeywordAssociations(
      prevKeyword.keywordId,
    ); // Tanstack Query 내부에서 enabled 설정을 했기 때문에 non-null assertion 사용함
    return data;
  };

  const { data, isLoading } = useQuery(
    [REACT_QUERY_KEY.RELATED_KEYWORD, prevKeyword],
    getRelatedKeywordList,
    {
      initialData: [],
      enabled: !!prevKeyword,
    },
  );

  return { data, isLoading };
};

export default useRelatedKeywordList;
