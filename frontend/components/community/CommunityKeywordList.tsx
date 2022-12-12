import { Loading } from '@components/common';
import { useKeywordListQuery } from '@hooks/keyword';
import { useRouter } from 'next/router';

const CommunityKeywordList = () => {
  const router = useRouter();
  const communityId: string = router.query.id as string;
  const { data: fetchedKeywordData, isLoading } =
    useKeywordListQuery(communityId);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ul>
      {fetchedKeywordData?.map((keywordData) => (
        <li key={keywordData.keywordId}>
          {keywordData.keywordName} ({keywordData.memberCount})
        </li>
      ))}
    </ul>
  );
};

export default CommunityKeywordList;
