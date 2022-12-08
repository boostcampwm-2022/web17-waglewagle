import { REACT_QUERY_KEY } from '@constants/constants';
import styles from '@sass/components/admin/KeywordDeleteModalContent.module.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classnames from 'classnames/bind';
import { useRouter } from 'next/router';
import apis from '../../apis/apis';
const cx = classnames.bind(styles);

type Keyword = {
  keywordId: string;
  keywordName: string;
  memberCount: number;
  isSelected: boolean;
};

interface KeywordDeleteModalContentProps {
  selectedKeywordList: Keyword[];
  closeModal(): void;
}

const KeywordDeleteModalContent = ({
  selectedKeywordList,
  closeModal,
}: KeywordDeleteModalContentProps) => {
  const router = useRouter();
  const { id } = router.query;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () =>
      apis.deleteKeyword(
        id as string,
        selectedKeywordList.map((selectedKeyword) => selectedKeyword.keywordId),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEY.KEYWORD, id]);
      closeModal();
    },
  });

  return (
    <div className={cx('layout')}>
      <p className={cx('info-message')}>
        키워드를 삭제하면, 소그룹도 함께 삭제됩니다.
        <br />
        삭제하시겠습니까?
      </p>
      <ul className={cx('keyword-list')}>
        {selectedKeywordList.map((keyword) => (
          <li key={keyword.keywordId} className={cx('keyword')}>
            {keyword.keywordName}({keyword.memberCount})
          </li>
        ))}
      </ul>
      <div className={cx('buttons')}>
        <button
          onClick={() => {
            mutate();
          }}
        >
          예
        </button>
        <button
          onClick={() => {
            closeModal();
          }}
        >
          아니오
        </button>
      </div>
    </div>
  );
};

export default KeywordDeleteModalContent;
