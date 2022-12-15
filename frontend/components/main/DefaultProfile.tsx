import Image from 'next/image';
import classnames from 'classnames/bind';
import styles from '@sass/components/main/DefaultProfile.module.scss';
const cx = classnames.bind(styles);

const DefaultProfile = () => {
  return (
    <div className={cx('wrapper')}>
      <h3>마이페이지</h3>
      <div className={cx('profile-wrapper')}>
        <Image
          src={'/images/default-profile.png'}
          alt='커뮤니티 이미지'
          width={100}
          height={100}
        />
      </div>
      <p>유저 이름</p>
      <button className={cx('profile-edit-button')}>프로필 수정하기</button>
      <button className={cx('logout-button')}>로그아웃</button>
      <button className={cx('withdrawal-button')}>회원탈퇴</button>
    </div>
  );
};

export default DefaultProfile;
