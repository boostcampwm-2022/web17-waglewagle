import Image from 'next/image';
import heroImage from '@public/images/planet.png';
import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeHero.module.scss';
const cx = classnames.bind(styles);
import axios from 'axios';

const HomeHero = () => {
  // TODO : 지우기
  const getCookie = () => {
    axios
      .get('http://www.waglewagle.link/api')
      .then((response) => {
        alert(
          `서버에서 쿠키를 잘 받아왔습니다. 개발자도구 어플리케이션 탭에서 확인해주세요 값 : ${response.data}`,
        );
      })
      .catch(() => {
        alert('서버 통신에 실패했습니다.');
      });
  };
  return (
    <div onClick={getCookie} className={cx('image-container')}>
      <Image src={heroImage} alt='행성 사진' height={350} />
    </div>
  );
};

export default HomeHero;
