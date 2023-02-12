import React from "react";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

import Modal from "../shared/Modal";

import "./MoodModal.styles.scss";
import MoodModalForm from "./MoodModalForm";
import { MoodModalProps } from "./types";

function MoodModal({ onClose, visible, ...props }: MoodModalProps): JSX.Element {
  const [t] = useTranslation(["MoodModal", "Home", "Shared"]);
  return (
    <Modal
      visible={visible}
      title={t("Home:addEntry")}
      onClose={onClose}
      className="app-mood-modal"
      actions={
        <>
          <Button type="reset" form="mood-form" onClick={onClose}>
            {t("Shared:cancel")}
          </Button>
          <Button type="submit" form="mood-form" variant="contained">
            {t("Shared:save")}
          </Button>
        </>
      }>
      <MoodModalForm {...props} onClose={onClose} />
    </Modal>
  );
}

export default MoodModal;
