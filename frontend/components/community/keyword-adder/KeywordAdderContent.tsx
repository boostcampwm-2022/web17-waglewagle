import {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import {
  useAddKeywordMutation,
  useJoinKeywordMutation,
  useKeywordListQuery,
} from '@hooks/keyword';
import useAutoComplete from '@hooks/useAutoComplete';
import checkIsExistKeyword from '@utils/checkIsExistKeyword';
import AutoCompleteFormContent from './AutoCompleteForm';
import AutoCompleteFormLayout from './AutoCompleteFormLayout';
import SearchResultList from './SearchResultList';
import SearchResultListLayout from './SearchResultListLayout';
import type { MyKeywordData } from '#types/types';
import styles from '@sass/components/community/keyword-adder/KeywordAdderLayout.module.scss';

const cx = classnames.bind(styles);

interface KeywordAdderProps {
  theme: string;
  addButtonValue: React.ReactNode | string;
  handleChangePrevKeyword: (prevKeyword: MyKeywordData) => void;
}

const KeywordAdderContent = ({
  theme,
  addButtonValue,
  handleChangePrevKeyword,
}: KeywordAdderProps) => {
  const router = useRouter();
  const communityId: string = router.query.id as string;
  const [isOpenDropdown, setIsOpenDropDown] = useState<boolean>(false);

  const { data: communityKeywordData } = useKeywordListQuery(communityId);
  const { mutate: addKeywordMutate } = useAddKeywordMutation(
    handleChangePrevKeyword,
  );
  const { mutate: joinKeywordMutate, isError: isJoinError } =
    useJoinKeywordMutation(handleChangePrevKeyword);
  const { searchKeyword, searchResult, changeSearchKeyword } =
    useAutoComplete(communityKeywordData);

  // 이후 키워드의 유효성 검사를 할 항목이 생기면 추가하기
  // 현재는 빈 항목을 제외한 내용이 없어서 정규표현식 사용하지 않음.
  const isValidateKeyword = (keyword: string) => {
    if (keyword.trim() === '') {
      return false;
    }

    return true;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!isValidateKeyword(searchKeyword)) {
      alert('유효하지 않은 키워드 입니다.');
      return;
    }

    // 키워드가 커뮤니티에 존재하는지 확인하여 id 혹은 false를 반환하는 함수
    const keywordId = checkIsExistKeyword(searchKeyword, communityKeywordData);

    // 추상화 수준을 맞춰주기 위해서 join과 add 모두 mutation 내부에서 myKeywordList를 갱신함
    if (keywordId) {
      const joinKeywordData = {
        keywordId,
        communityId,
        keywordName: searchKeyword,
      };
      joinKeywordMutate(joinKeywordData);
    } else {
      const addKeywordData = {
        keywordName: searchKeyword,
        communityId,
      };
      addKeywordMutate(addKeywordData);
    }

    setIsOpenDropDown(false);
    changeSearchKeyword('');
  };

  const handleIsOpenDropDown = (state: boolean) => {
    setIsOpenDropDown(state);
  };

  const handleMouseDownResultItem: MouseEventHandler<HTMLLIElement> = (e) => {
    e.preventDefault();
    const target = e.target as HTMLLIElement;
    changeSearchKeyword(target.innerText);
  };

  useEffect(() => {
    if (isJoinError) {
      alert('키워드 가입 중 문제가 발생했습니다.');
    }
  }, [isJoinError]);

  return (
    <div
      className={cx(theme)}
      onFocus={() => setIsOpenDropDown(true)}
      onBlur={() => setIsOpenDropDown(false)}
    >
      {isOpenDropdown && (
        <SearchResultListLayout layoutTheme={theme}>
          <SearchResultList
            searchResult={searchResult}
            handleMouseDownResultItem={handleMouseDownResultItem}
          />
        </SearchResultListLayout>
      )}
      <AutoCompleteFormLayout layoutTheme={theme} handleSubmit={handleSubmit}>
        <AutoCompleteFormContent
          addButtonValue={addButtonValue}
          searchKeyword={searchKeyword}
          handleIsOpenDropDown={handleIsOpenDropDown}
          changeSearchKeyword={changeSearchKeyword}
        />
      </AutoCompleteFormLayout>
    </div>
  );
};

export default KeywordAdderContent;
