import Image from 'next/image';
import classnames from 'classnames/bind';
import useUserMe from '@hooks/useUserMe';
import styles from '@sass/components/community/CommunityHeader.module.scss';

const cx = classnames.bind(styles);

interface CommunityHeaderProps {
  title: string;
  handleClickEnter: () => void;
  handleClickKeywordModal: () => void;
}

const CommunityHeader = ({
  title,
  handleClickEnter,
  handleClickKeywordModal,
}: CommunityHeaderProps) => {
  const userData = useUserMe();

  return (
    <header className={cx('header')}>
      <div className={cx('left-header')}>
        <Image src='/images/logo.png' alt='로고' width={30} height={30} />
        <h2>{title}</h2>
      </div>
      <div className={cx('buttons')}>
        {userData ? (
          <button
            onClick={handleClickKeywordModal}
            className={cx('enter-button')}
          >
            키워드 입력하기
          </button>
        ) : (
          <button onClick={handleClickEnter} className={cx('enter-button')}>
            입장하기
          </button>
        )}
      </div>
    </header>
  );
};

export default CommunityHeader;
