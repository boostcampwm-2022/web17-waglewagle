import { useState } from 'react';
import { Modal } from '@components/common';
import DefaultProfile from './DefaultProfile';
import Image from 'next/image';
import UserIcon from '@public/images/user.svg';
import styles from '@sass/components/main/MainHeader.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const MainHeader = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <header className={cx('header')}>
      <Image src='/images/logo.png' alt='로고' width={30} height={30} />
      <button
        className={cx('user-button')}
        onClick={() => {
          setIsOpenModal((prev) => !prev);
        }}
      >
        <UserIcon />
      </button>
      <Modal isOpenModal={isOpenModal} closeModal={() => setIsOpenModal(false)}>
        <DefaultProfile />
      </Modal>
    </header>
  );
};

export default MainHeader;
