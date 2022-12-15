interface MainTitleProps {
  username: string;
}

const MainTitle = ({ username }: MainTitleProps) => {
  return <h2>{username} 님의 커뮤니티</h2>;
};

export default MainTitle;
