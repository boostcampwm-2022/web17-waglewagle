import { MouseEventHandler, ReactNode, useState } from 'react';
import classnames from 'classnames/bind';
import ReactDOM from 'react-dom';
import styles from '@sass/components/common/Modal.module.scss';
const cx = classnames.bind(styles);

interface ModalProps {
  isOpenModal: boolean;
  children: ReactNode;
  closeModal(): void;
}

const Modal = ({ isOpenModal, closeModal, children }: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClickModalBackground: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement;
    if (target?.className === cx('background')) {
      setIsClosing(true);
      setTimeout(() => {
        closeModal();
        setIsClosing(false);
      }, 250);
    }
  };

  if (!isOpenModal) {
    return <></>;
  }

  return ReactDOM.createPortal(
    <div
      className={cx('background', { close: isClosing })}
      onClick={handleClickModalBackground}
    >
      <div className={cx('contents', { close: isClosing })}>{children}</div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default Modal;
