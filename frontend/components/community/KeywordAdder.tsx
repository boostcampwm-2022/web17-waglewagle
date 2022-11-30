import {
  MouseEventHandler,
  ChangeEventHandler,
  FormEventHandler,
  useState,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import useAutoComplete from '@hooks/useAutoComplete';
import {
  SearchResultListLayout,
  AutoCompleteFormLayout,
} from '@components/community';
import styles from '@sass/components/community/KeywordAdderLayout.module.scss';
import classnames from 'classnames/bind';
import useKeywordListQuery from '@hooks/useKeywordListQuery';
import apis from '../../apis/apis';
import { KeywordAssociationData } from '../../types/types';
const cx = classnames.bind(styles);

interface KeywordAdderProps {
  theme: string;
  addButtonValue: React.ReactNode | string;
}

const KeywordAdder = ({ theme, addButtonValue }: KeywordAdderProps) => {
  const router = useRouter();
  const communityId: string = router.query.id as string;
  const communityKeywordData = useKeywordListQuery(communityId);
  const {
    searchKeyword, // TODO: 이것을 여기서 useAutoComplete에서 관리해주는게 맞을까? 의존제어가 제대로 되고 있는걸까? 자식 컴포넌트처럼 생각해도 될까? 무언가 Badsmell. 그냥 어색한걸까?
    searchResult,
    changeSearchKeyword,
  } = useAutoComplete(communityKeywordData);

  const [isOpenDropdown, setIsOpenDropDown] = useState<boolean>(false);
  const [keywordAssociations, setKeywordAssociations] = useState<
    KeywordAssociationData[]
  >([]);

  const getKeywordAssociations = async (keywordId: string) => {
    const keywordAssociationsData = await apis.getKeywordAssociations(
      keywordId,
    );
    const slicedData = keywordAssociationsData.slice(0, 3);
    setKeywordAssociations(slicedData);
  };

  // TODO: 테스트코드 작성 가능
  const getKeywordIdByKeyword = (keyword: string): string | false => {
    // 커뮤니티 키워드 데이터가 없으면 검색할 수 없다.
    if (!communityKeywordData) {
      return false;
    }

    // some을 쓰면 예외처리가 힘들 것 같아서 filter 사용
    const result = communityKeywordData?.filter(
      (keywordData) => keywordData.keywordName === keyword,
    );

    if (result.length === 0) {
      return false;
    }

    if (result.length > 1) {
      // TODO: 커스텀 에러 객체 만들기
      throw new Error('중복된 id가 있습니다.');
    }

    return result[0].keywordId;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsOpenDropDown(false);
    changeSearchKeyword('');
    const keywordId = getKeywordIdByKeyword(searchKeyword);
    if (keywordId) {
      await getKeywordAssociations(keywordId);
    }
  };

  const handleChangeSearchKeyword: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setIsOpenDropDown(true);
    changeSearchKeyword(e.target.value);
  };

  const handleMouseDownkResultItem: MouseEventHandler<HTMLLIElement> = (e) => {
    e.preventDefault();
    const target = e.target as HTMLLIElement;
    changeSearchKeyword(target.innerText);
  };

  // 이후 분리하여 상위 컴포넌트에서 사용 필요함.
  // TODO: 전역상태관리 쓸지 물어보기
  // useEffect(() => {
  //   console.log(keywordAssociations);
  // }, [keywordAssociations]);

  return (
    <div
      className={cx(theme)}
      onFocus={() => setIsOpenDropDown(true)}
      onBlur={() => setIsOpenDropDown(false)}
    >
      {isOpenDropdown && (
        <SearchResultListLayout layoutTheme={theme}>
          {searchResult.map((word, index) => (
            <li onMouseDown={handleMouseDownkResultItem} key={index}>
              {word}
            </li>
          ))}
        </SearchResultListLayout>
      )}
      <AutoCompleteFormLayout layoutTheme={theme} handleSubmit={handleSubmit}>
        <input
          type='text'
          value={searchKeyword}
          onChange={handleChangeSearchKeyword}
        />
        <button type='submit'>{addButtonValue}</button>
      </AutoCompleteFormLayout>
    </div>
  );
};

export default KeywordAdder;
