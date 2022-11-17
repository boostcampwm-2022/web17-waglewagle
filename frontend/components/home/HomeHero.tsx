import React from 'react';
import Image from 'next/image';
import heroImage from '@public/images/planet.png';

const HomeHero = () => {
  return <Image src={heroImage} alt='행성 사진' height={400} />;
};

export default HomeHero;
