import DefaultButton from '../common/DefaultButton';

interface StartButtonProps {
  handleClick: () => void;
}

// TODO : 버튼 기능이 페이지 이동으로 수정되며 추가된 버튼. DefaultButton 컴포넌트를 어떻게 할지 논의하기
const StartButton = ({ handleClick }: StartButtonProps) => {
  return (
    <DefaultButton
      handleClick={handleClick}
      width={200}
      height={40}
      fontSize={18}
    >
      시작하기
    </DefaultButton>
  );
};

export default StartButton;
