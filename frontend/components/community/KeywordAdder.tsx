import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import useAutoComplete from '@hooks/useAutoComplete';
import {
  SearchResultListLayout,
  AutoCompleteFormLayout,
} from '@components/community';
import apis from '../../apis/apis';
import { KeywordData } from '../../types/types';
import AddCircleIcon from '@public/images/add-circle.svg';
import styles from '@sass/components/community/KeywordAdderLayout.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface KeywordAdderProps {
  theme: string;
}

const KeywordAdder = ({ theme }: KeywordAdderProps) => {
  const router = useRouter();
  const communityId: string = router.query.id as string;
  const { data } = useQuery<KeywordData[]>(
    ['keyword', communityId],
    () => {
      const data = apis.getKeywords(communityId);
      return data;
    },
    {
      enabled: !!communityId,
    },
  );

  const [communityKeywordData, setCommunityKeywordData] = useState<
    KeywordData[]
  >([]);
  const {
    searchKeyword,
    searchResult,
    changeSearchKeyword,
    updateSearchResult,
  } = useAutoComplete(communityKeywordData);

  // TODO: 자동완성 컴포넌트 추상화하면서 거기로 넘기기
  const [isOpenDropdown, setIsOpenDropDown] = useState<boolean>(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setIsOpenDropDown(true);
    updateSearchResult();
  };

  const handleChangeSearchKeyword: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    changeSearchKeyword(e.target.value);
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    setCommunityKeywordData(data);
  }, [data]);

  return (
    <div className={cx('keyword-adder')}>
      {isOpenDropdown && (
        <SearchResultListLayout layoutTheme={theme}>
          {searchResult.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </SearchResultListLayout>
      )}
      <AutoCompleteFormLayout layoutTheme={theme} handleSubmit={handleSubmit}>
        <input
          type='text'
          value={searchKeyword}
          onChange={handleChangeSearchKeyword}
          onFocus={() => setIsOpenDropDown(true)}
          onBlur={() => setIsOpenDropDown(false)}
        />
        <button type='submit'>
          <AddCircleIcon />
        </button>
      </AutoCompleteFormLayout>
    </div>
  );
};

export default KeywordAdder;
