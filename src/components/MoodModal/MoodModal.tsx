import React, { useState } from "react";
import { EntryCreationData } from "../../data/entries/EntryDto";
import Modal from "../shared/Modal";

import "./MoodModal.styles.scss";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

export interface MoodModalProps {
  visible?: boolean;
  addEntry: (entry: EntryCreationData) => Promise<void>;
  onClose?: () => void;
}

const defaultEntry: EntryCreationData = {
  primaryMood: "neutral",
  secondaryMoods: [],
  text: "",
};

function MoodModal({ addEntry, onClose, visible }: MoodModalProps): JSX.Element {
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
      <MoodModalForm addEntry={addEntry} onClose={onClose} />
    </Modal>
  );
}

export default MoodModal;

// Small optimization to avoid re-renders.
function MoodModalForm({ addEntry, onClose }: MoodModalProps): JSX.Element {
  const [t] = useTranslation("MoodModal");
  const [entry, setEntry] = useState<EntryCreationData>(defaultEntry);

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as unknown as HTMLInputElement;
    setEntry({ ...entry, [target.name]: target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addEntry(entry).then(() => {
      setEntry(defaultEntry);
      onClose?.call(null);
    });
  };

  return (
    <form id="mood-form" onChange={handleChange} onSubmit={handleSubmit}>
      <p id="primaryMood-label">{t("primaryMood.label")}</p>
      <div className="form-input mood">
        <FormControl>
          <RadioGroup
            aria-labelledby="primaryMood-label"
            name="primaryMood"
            row
            value={entry.primaryMood}>
            <FormControlLabel
              value="good"
              control={<Radio />}
              label={t("Shared:primaryMood.good")}
            />
            <FormControlLabel
              value="neutral"
              control={<Radio />}
              label={t("Shared:primaryMood.neutral")}
            />
            <FormControlLabel value="bad" control={<Radio />} label={t("Shared:primaryMood.bad")} />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="form-input text">
        <FormControl>
          <p id="text-label">{t("MoodModal:text.label")}</p>
          <TextField
            aria-labelledby="text-label"
            multiline
            maxRows={5}
            name="text"
            value={entry.text}
          />
        </FormControl>
      </div>
    </form>
  );
}
