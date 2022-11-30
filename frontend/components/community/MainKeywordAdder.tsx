import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import apis from '../../apis/apis';
import AddCircleIcon from '@public/images/add-circle.svg';
import { KeywordData } from '../../types/types';
import useAutoComplete from '@hooks/useAutoComplete';
import styles from '@sass/components/community/AutoComplete.module.scss';
import classnames from 'classnames/bind';
import SearchResultListLayout from './SearchResultListLayout';
const cx = classnames.bind(styles);

const MainKeywordAdder = () => {
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
    <div className={cx('auto-complete')}>
      {isOpenDropdown && (
        <SearchResultListLayout theme='primary'>
          {searchResult.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </SearchResultListLayout>
      )}
      <form onSubmit={handleSubmit} className={cx('form')}>
        <input
          type='text'
          value={searchKeyword}
          onChange={handleChangeSearchKeyword}
          className={cx('input')}
          onFocus={() => setIsOpenDropDown(true)}
          onBlur={() => setIsOpenDropDown(false)}
        />
        <button type='submit' className={cx('submit-button')}>
          <AddCircleIcon />
        </button>
      </form>
    </div>
  );
};

export default MainKeywordAdder;
