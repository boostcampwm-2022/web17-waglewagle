import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEY } from '@constants/constants';
import apis from '../apis/apis';
import { MyKeywordData } from '#types/types';

const useRelatedKeywordList = (prevKeyword?: MyKeywordData) => {
  const getRelatedKeywordList = () => {
    const relatedList = apis.getKeywordAssociations(prevKeyword!.keywordId); // Tanstack Query 내부에서 enabled 설정을 했기 때문에 non-null assertion 사용함
    return relatedList;
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
