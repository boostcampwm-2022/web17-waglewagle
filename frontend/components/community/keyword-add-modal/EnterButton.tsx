import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import { apis } from '@apis/index';
import { useMyKeywordQuery } from '@hooks/keyword';
import useUserMe from '@hooks/useUserMe';
import styles from '@sass/components/community/keyword-add-modal/EnterButton.module.scss';

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
    if (myKeywordList.length < 3) {
      alert('키워드를 세 개 이상 추가해주세요.');
      return;
    }

    await apis.user.updateFirstVisitInCommunity(communityId);
    closeKeywordModal();
  };

  return (
    <>
      {userData?.isFirstInCommunity ? (
        <button
          onClick={handleClickEnter}
          className={cx('enter-button', { enabled: myKeywordList.length > 2 })}
        >
          입장하기
        </button>
      ) : (
        <button
          onClick={closeKeywordModal}
          className={cx('enter-button', 'enabled')}
        >
          닫기
        </button>
      )}
    </>
  );
};

export default EnterButton;
