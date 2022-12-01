import KeywordGroupLayout from './KeywordLayout';
import KeywordMain from './KeywordMain';
import KeywordUserList from './KeywordUserList';

const KeywordModalContent = () => {
  return (
    <KeywordGroupLayout>
      <KeywordMain />
      <KeywordUserList />
    </KeywordGroupLayout>
  );
};

export default KeywordModalContent;
