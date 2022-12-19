import React, { ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import "./Modal.styles.scss";

export interface ModalProps {
  className?: string;
  visible?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}

function Modal({ actions, children, className, onClose, title, visible }: ModalProps): JSX.Element {
  const handleClose = (e: React.SyntheticEvent) => {
    onClose?.call(null);
  };

  console.log("Modal", { visible });
  return (
    <Dialog open={visible || false} onClose={handleClose} className={`app-modal ${className}`}>
      {title && (
        <DialogTitle sx={{ m: 0, p: 2 }} className="app-modal-header">
          {title}
          {onClose && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}>
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}

      <DialogContent className="app-modal-body">{children}</DialogContent>
      {actions && <DialogActions className="app-modal-actions">{actions}</DialogActions>}
    </Dialog>
  );
}

export default Modal;
