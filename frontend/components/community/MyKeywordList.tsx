import MyKeyword from './MyKeyword';

interface MyKeywordListProps {
  children: React.ReactNode;
}

const MyKeywordList = ({ children }: MyKeywordListProps) => {
  return <ol>{children}</ol>;
};

export default MyKeywordList;
