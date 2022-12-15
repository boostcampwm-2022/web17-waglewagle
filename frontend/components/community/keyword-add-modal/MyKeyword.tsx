import { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import { useDisjoinKeywordMutation } from '@hooks/keyword';
import type { MyKeywordData } from '#types/types';
import styles from '@sass/components/community/keyword-add-modal/MyKeyword.module.scss';

const cx = classnames.bind(styles);

interface MyKeywordProps {
  keywordData: MyKeywordData;
}

const MyKeyword = ({ keywordData }: MyKeywordProps) => {
  const router = useRouter();
  const communityId = router.query.id as string;
  const { mutate: disjoinKeywordMutate } = useDisjoinKeywordMutation();

  const handleDeleteClick: MouseEventHandler<HTMLButtonElement> = () => {
    const disjoinKeywordData = {
      keywordId: keywordData.keywordId,
      communityId,
    };
    disjoinKeywordMutate(disjoinKeywordData);
  };

  return (
    <li className={cx('keyword-item')}>
      {keywordData.keywordName}
      <button onClick={handleDeleteClick} className={cx('delete-button')}>
        x
      </button>
    </li>
  );
};

export default MyKeyword;
