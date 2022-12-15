import KeywordGroupLayout from './KeywordGroupLayout';
import KeywordGroupMain from './KeywordGroupMain';
import KeywordGroupUserList from './KeywordGroupUserList';

interface KeywordGroupModalContentProps {
  keywordId: string;
  keyword: string;
}

const KeywordGroupModalContent = ({
  keywordId,
  keyword,
}: KeywordGroupModalContentProps) => {
  return (
    <KeywordGroupLayout>
      <KeywordGroupMain keywordId={keywordId} keyword={keyword} />
      <KeywordGroupUserList keywordId={keywordId} keyword={keyword} />
    </KeywordGroupLayout>
  );
};

export default KeywordGroupModalContent;
