interface MyKeywordProps {
  keyword: string;
}

const MyKeyword = ({ keyword }: MyKeywordProps) => {
  return (
    <li>
      {keyword}
      <span>x</span>
    </li>
  );
};

export default MyKeyword;
