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
  return (
    <Modal
      visible={visible}
      title="Add mood"
      onClose={onClose}
      className="app-mood-modal"
      actions={
        <>
          <Button type="reset" form="mood-form" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="mood-form" variant="contained">
            Save
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
      <p id="primaryMood-label">Tell us about how you feel right now</p>
      <div className="form-input mood">
        <FormControl>
          <RadioGroup
            aria-labelledby="primaryMood-label"
            name="primaryMood"
            row
            value={entry.primaryMood}>
            <FormControlLabel value="good" control={<Radio />} label="Good" />
            <FormControlLabel value="neutral" control={<Radio />} label="Neutral" />
            <FormControlLabel value="bad" control={<Radio />} label="Bad" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="form-input text">
        <FormControl>
          <p id="text-label">Add a few words to describe why you feel like that</p>
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
