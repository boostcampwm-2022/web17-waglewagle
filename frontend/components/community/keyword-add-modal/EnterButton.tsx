import { useRouter } from 'next/router';
import { apis } from '@apis/index';
import { useMyKeywordQuery } from '@hooks/keyword';
import useUserMe from '@hooks/useUserMe';
import styles from '@sass/components/community/keyword-add-modal/EnterButton.module.scss';
import classnames from 'classnames/bind';

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
    await apis.user.updateFirstVisitInCommunity(communityId);
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
