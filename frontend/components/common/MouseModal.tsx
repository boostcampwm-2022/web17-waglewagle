import { MouseEventHandler, ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames/bind';
import styles from '@sass/components/common/MouseModal.module.scss';
const cx = classnames.bind(styles);

interface MouseModalProps {
  left: number | undefined;
  top: number | undefined;
  isOpenModal: boolean;
  closeModal(): void;
  children: ReactNode;
}

const MouseModal = ({
  left,
  top,
  isOpenModal,
  closeModal,
  children,
}: MouseModalProps) => {
  const handleClickModalBackground: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement;
    if (target?.className === cx('background')) {
      setTimeout(() => {
        closeModal();
      });
    }
  };

  if (!isOpenModal) {
    return <></>;
  }

  return ReactDOM.createPortal(
    <div className={cx('background')} onClick={handleClickModalBackground}>
      <div
        style={{ left: left && left, top: top && top }}
        className={cx('contents')}
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default MouseModal;
