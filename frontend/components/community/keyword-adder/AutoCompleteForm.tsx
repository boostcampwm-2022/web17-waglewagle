import { ChangeEventHandler, ReactNode } from 'react';

interface AutoCompleteFormContentProps {
  addButtonValue: ReactNode;
  searchKeyword: string;
  handleIsOpenDropDown: (state: boolean) => void;
  changeSearchKeyword: (value: string) => void;
}

const AutoCompleteFormContent = ({
  addButtonValue,
  searchKeyword,
  handleIsOpenDropDown,
  changeSearchKeyword,
}: AutoCompleteFormContentProps) => {
  const handleChangeSearchKeyword: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    handleIsOpenDropDown(true);
    changeSearchKeyword(e.target.value);
  };

  return (
    <>
      <input
        type='text'
        value={searchKeyword}
        onChange={handleChangeSearchKeyword}
        aria-label='관심사 키워드 입력 영역'
        placeholder='키워드를 입력해주세요.'
      />
      <button type='submit' aria-label='관심사 키워드 추가 버튼'>
        {addButtonValue}
      </button>
    </>
  );
};

export default AutoCompleteFormContent;
