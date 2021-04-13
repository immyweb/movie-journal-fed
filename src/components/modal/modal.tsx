import React from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

type IModal = {
  content: React.ReactNode;
  onCloseModal: () => void;
};

let modalElement = document.getElementById('modal-root') as HTMLElement;
if (!modalElement) {
  modalElement = document.createElement('div');
  modalElement.setAttribute('id', 'modal-root');
  document.body.appendChild(modalElement);
}

const Modal = ({ content, onCloseModal }: IModal): JSX.Element => {
  return createPortal(
    <section className={styles.modalContainer}>
      <div className={styles.modalInner}>
        <button onClick={onCloseModal} className={styles.closeBtn}>
          X
        </button>
        <div className={styles.modalContent}>{content}</div>
      </div>
    </section>,
    modalElement,
  );
};

export default Modal;
