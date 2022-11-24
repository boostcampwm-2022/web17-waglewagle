import Image from 'next/image';
import styles from '@sass/components/community/KeywordAssociated.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

// 나중에 common으로 분리될 수 있다.
const KeywordAssociated = () => {
  return (
    <div className={cx('container')}>
      <Image
        src='/images/window-dog.png'
        width={66}
        height={70}
        alt='추천 키워드를 알려주는 윈도우 도우미 강아지'
      />
    </div>
  );
};

export default KeywordAssociated;
