import styles from '@sass/components/community/CommunityHeader.module.scss';
import classnames from 'classnames/bind';
import Image from 'next/image';
const cx = classnames.bind(styles);

interface CommunityHeaderProps {
  title: string;
  handleClickEnter: () => void;
}

const CommunityHeader = ({ title, handleClickEnter }: CommunityHeaderProps) => {
  return (
    <header className={cx('header')}>
      <div className={cx('left-header')}>
        <Image src='/images/logo.png' alt='로고' width={30} height={30} />
        <h2>{title}</h2>
      </div>
      <div className={cx('buttons')}>
        <button onClick={handleClickEnter} className={cx('enter-button')}>
          입장하기
        </button>
      </div>
    </header>
  );
};

export default CommunityHeader;
