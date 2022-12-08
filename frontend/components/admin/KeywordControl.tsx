import { KeywordData } from '#types/types';
import KeywordDeleteModalContent from '@components/admin/KeywordDeleteModalContent';
import { Modal } from '@components/common';
import { REACT_QUERY_KEY } from '@constants/constants';
import styles from '@sass/components/admin/keywordControl.module.scss';
import { useQuery } from '@tanstack/react-query';
import classnames from 'classnames/bind';
import { useState } from 'react';
import apis from '../../apis/apis';
const cx = classnames.bind(styles);

type Keyword = {
  keywordId: string;
  keywordName: string;
  memberCount: number;
  isSelected: boolean;
};

const KeywordControl = () => {
  const [keywordList, setKeywordList] = useState<Keyword[]>([]);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const _ = useQuery<KeywordData[]>(
    [REACT_QUERY_KEY.KEYWORD, '1'],
    () => apis.getKeywords('1'),
    {
      enabled: !!'123',
      onSuccess: (data) => {
        const newData = data.map((keyword) => ({
          ...keyword,
          isSelected: false,
        }));
        setKeywordList(newData);
      },
      refetchOnWindowFocus: false,
    },
  );

  const selectKeyword = (id: string) => {
    setKeywordList(
      keywordList.map((keyword) =>
        keyword.keywordId === id
          ? {
              ...keyword,
              isSelected: !keyword.isSelected,
            }
          : keyword,
      ),
    );
  };

  return (
    <>
      <h4>키워드 목록</h4>
      <ul className={cx('keyword-list')}>
        {keywordList?.map((keyword) => (
          <li
            key={keyword.keywordId}
            onClick={() => {
              selectKeyword(keyword.keywordId);
            }}
            className={cx('keyword', { selected: keyword.isSelected })}
          >
            {keyword.keywordName}({keyword.memberCount})
          </li>
        ))}
      </ul>
      <button className={cx('merge-button')}>키워드 병합</button>
      <button
        className={cx('delete-button')}
        onClick={() => {
          setIsOpenDeleteModal(true);
        }}
      >
        키워드 삭제
      </button>
      <Modal
        isOpenModal={isOpenDeleteModal}
        closeModal={() => setIsOpenDeleteModal(false)}
      >
        <KeywordDeleteModalContent
          selectedKeywordList={keywordList.filter(
            (keyword) => keyword.isSelected,
          )}
          closeModal={() => setIsOpenDeleteModal(false)}
        />
      </Modal>
    </>
  );
};

export default KeywordControl;
