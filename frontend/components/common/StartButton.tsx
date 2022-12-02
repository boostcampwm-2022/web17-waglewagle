import classnames from 'classnames/bind';
import styles from '@sass/components/common/DefaultButton.module.scss';
import Link from 'next/link';
import DefaultButton from './DefaultButton';
import config from '../../config';
const cx = classnames.bind(styles);

// TODO : 버튼 기능이 페이지 이동으로 수정되며 추가된 버튼. DefaultButton 컴포넌트를 어떻게 할지 논의하기
const StartButton = () => {
  return (
    <Link className={cx('default')} href={`${config.HOST}/community/1`}>
      <DefaultButton width={200} height={40} fontSize={18}>
        시작하기
      </DefaultButton>
    </Link>
  );
};

export default StartButton;
