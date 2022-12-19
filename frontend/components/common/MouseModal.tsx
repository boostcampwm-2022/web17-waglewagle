import React, { MouseEventHandler, ReactNode } from 'react';
import classnames from 'classnames/bind';
import ReactDOM from 'react-dom';
import styles from '@sass/components/common/MouseModal.module.scss';
const cx = classnames.bind(styles);

interface MouseModalProps {
  left: number | undefined;
  top: number | undefined;
  isOpenModal: boolean;
  children: ReactNode;
  closeModal(): void;
}

const MouseModal = React.forwardRef(
  (
    { left, top, isOpenModal, closeModal, children }: MouseModalProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const handleClickModalBackground: MouseEventHandler<HTMLDivElement> = (
      e,
    ) => {
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
          ref={ref}
          style={{ left: left && left, top: top && top }}
          className={cx('contents')}
        >
          {children}
        </div>
      </div>,
      document.getElementById('modal-root') as HTMLElement,
    );
  },
);

MouseModal.displayName = 'MouseModal';

export default MouseModal;
