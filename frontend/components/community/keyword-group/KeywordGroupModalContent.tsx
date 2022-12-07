import KeywordGroupLayout from './KeywordGroupLayout';
import KeywordGroupMain from './KeywordGroupMain';
import KeywordGroupUserList from './KeywordGroupUserList';

const KeywordGroupModalContent = () => {
  return (
    <KeywordGroupLayout>
      <KeywordGroupMain />
      <KeywordGroupUserList />
    </KeywordGroupLayout>
  );
};

export default KeywordGroupModalContent;
