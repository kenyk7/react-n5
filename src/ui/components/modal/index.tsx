import clsx from 'clsx';
import { ReactNode } from 'react';

import css from './Modal.module.scss';

type ModalPropsR = {
  title: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

type ModalPropsO = {
  closeOnBackdrop?: boolean;
};

const defaultProps: ModalPropsO = {
  closeOnBackdrop: true,
};

type ModalProps = ModalPropsR & ModalPropsO;

function Modal({
  title,
  children,
  open,
  onClose,
  closeOnBackdrop,
}: ModalProps) {
  function handleBackdrop() {
    if (!closeOnBackdrop) return;
    onClose();
  }

  return (
    <div className={clsx([css.modal, { [css.modalOpen]: open }])}>
      {open && (
        <div
          className={css.backdrop}
          aria-hidden
          onClick={() => handleBackdrop()}
        />
      )}
      <div className={css.modal__content}>
        <div className={css.modal__close} aria-hidden onClick={onClose}>
          <span>&times;</span>
        </div>
        <h3
          className={css.modal__title}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className={css.modal__body}>{children}</div>
      </div>
    </div>
  );
}

Modal.defaultProps = defaultProps;

export default Modal;
