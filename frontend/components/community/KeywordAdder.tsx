import {
  MouseEventHandler,
  ChangeEventHandler,
  FormEventHandler,
  useState,
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
import getKeywordIdByKeyword from '@utils/getKeywordIdByKeywordName';
import { KeywordRelatedData, MyKeywordData } from '../../types/types';
const cx = classnames.bind(styles);

interface KeywordAdderProps {
  theme: string;
  addButtonValue: React.ReactNode | string;
  myKeywordList: MyKeywordData[];
  handleChangePrevAddedKeyword: (newPrevKeyword: string) => void;
  handleChangeMyKeywordList: (newList: MyKeywordData[]) => void;
  handleChangeRelatedKeywordList: (newList: KeywordRelatedData[]) => void;
}

const KeywordAdder = ({
  theme,
  addButtonValue,
  myKeywordList,
  handleChangeMyKeywordList,
  handleChangePrevAddedKeyword,
  handleChangeRelatedKeywordList,
}: KeywordAdderProps) => {
  const router = useRouter();
  const communityId: string = router.query.id as string;
  const { data: communityKeywordData } = useKeywordListQuery(communityId);
  const { searchKeyword, searchResult, changeSearchKeyword } =
    useAutoComplete(communityKeywordData);

  const [isOpenDropdown, setIsOpenDropDown] = useState<boolean>(false);

  const getKeywordAssociations = async (keywordId: string) => {
    const keywordAssociationsData = await apis.getKeywordAssociations(
      keywordId,
    );
    const slicedData = keywordAssociationsData.slice(0, 3);
    return slicedData;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    let keywordId = getKeywordIdByKeyword(searchKeyword, communityKeywordData);

    handleChangePrevAddedKeyword(searchKeyword);

    if (keywordId) {
      // 내 키워드에 추가 => 이후에는 Mutation으로 수정 필요
      // memberCount를 넣으려면 키워드 추가, 키워드 참여 api 수신 시 모두 memberCount를 포함해서 받거나 memberCount까지 가져와야하기 때문에 myKeywordList에서는 memberCount 제외
      await apis.joinKeyword({ keywordId, communityId });
      const newMyKeyword = { keywordId, keywordName: searchKeyword };
      const updatedMyKeywordList = [...myKeywordList, newMyKeyword];
      handleChangeMyKeywordList(updatedMyKeywordList);
    } else {
      const body = {
        keywordName: searchKeyword,
        communityId,
      };
      const result = await apis.addKeyword(body);
      keywordId = result.keywordId;
      const updatedMyKeywordList = [...myKeywordList, result];
      handleChangeMyKeywordList(updatedMyKeywordList);
    }

    const slicedData = await getKeywordAssociations(keywordId);
    handleChangeRelatedKeywordList(slicedData);
    setIsOpenDropDown(false);
    changeSearchKeyword('');
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
