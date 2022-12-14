import { useState } from 'react';
import Image from 'next/image';
import classnames from 'classnames/bind';
import { Modal } from '@components/common';
import UserIcon from '@public/images/icons/user.svg';
import DefaultProfile from './DefaultProfile';
import styles from '@sass/components/main/MainHeader.module.scss';
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
