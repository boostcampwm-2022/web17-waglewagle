import classnames from 'classnames/bind';
import styles from '@sass/components/community/KeywordAddModal.module.scss';
import apis from '@apis/apis';
import { useMyKeywordQuery } from '@hooks/keyword';
import useUserMe from '@hooks/useUserMe';
import { useRouter } from 'next/router';

const cx = classnames.bind(styles);

interface EnterButtonProps {
  closeKeywordModal: () => void;
}

const EnterButton = ({ closeKeywordModal }: EnterButtonProps) => {
  const router = useRouter();
  const communityId = router.query.id as string;
  const userData = useUserMe(communityId);
  const { data: myKeywordList } = useMyKeywordQuery(communityId);

  const handleClickEnter = async () => {
    await apis.updateFirstVisitInCommunity(communityId);
    closeKeywordModal();
  };

  return (
    <>
      {userData?.isFirstInCommunity ? (
        <button
          disabled={myKeywordList.length > 0 ? false : true}
          onClick={handleClickEnter}
          className={cx('enter-button')}
        >
          입장하기
        </button>
      ) : (
        <button onClick={closeKeywordModal} className={cx('enter-button')}>
          닫기
        </button>
      )}
    </>
  );
};

export default EnterButton;
