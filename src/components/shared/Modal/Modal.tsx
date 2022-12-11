import React, { ReactNode, useEffect, useRef } from "react";

import "./Modal.styles.scss";

export interface ModalProps {
  className?: string;
  visible?: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
}

function Modal({ actions, children, className, onClose, title, visible }: ModalProps): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (visible) {
      dialogRef.current?.showModal();
      setTimeout(() => {
        dialogRef.current?.classList.add("dialog-scale");
      }, 0.5);
    } else {
      dialogRef.current?.classList.remove("dialog-scale");
      setTimeout(() => {
        dialogRef.current?.close();
      }, 0.5);
    }
  }, [visible]);

  const handleClose = (e: React.SyntheticEvent) => {
    onClose?.call(null);
  };

  return (
    <dialog ref={dialogRef} onClose={handleClose} className={`app-modal ${className}`}>
      <header className="app-modal-header">
        {title && <h1>{title}</h1>}
        {onClose && (
          <span className="close" onClick={onClose}>
            ✖
          </span>
        )}
      </header>

      <div className="app-modal-body">{children}</div>
      {actions && <div className="app-modal-actions">{actions}</div>}
    </dialog>
  );
}

export default Modal;
