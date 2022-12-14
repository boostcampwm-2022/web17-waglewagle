import Image from 'next/image';
import heroImage from '@public/images/planet.png';
import styles from '@sass/components/home/HomeHero.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const HomeHero = () => {
  return (
    <div className={cx('image-container')}>
      <Image src={heroImage} alt='행성 사진' height={350} />
    </div>
  );
};

export default HomeHero;
