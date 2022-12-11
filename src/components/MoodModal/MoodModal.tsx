import React, { useState } from "react";
import { EntryCreationData } from "../../data/entries/EntryDto";
import Modal from "../shared/Modal";

import "./MoodModal.styles.scss";

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
    <Modal
      visible={visible}
      title="Add mood"
      onClose={onClose}
      className="app-mood-modal"
      actions={
        <>
          <button type="submit" form="mood-form">
            Save
          </button>
        </>
      }>
      <form id="mood-form" onChange={handleChange} onSubmit={handleSubmit}>
        <p>Tell us about how you feel right now</p>
        <div className="form-input mood">
          <label>
            <input type="radio" name="primaryMood" value="good" /> Good
          </label>
          <label>
            <input type="radio" name="primaryMood" value="neutral" /> Neutral
          </label>
          <label>
            <input type="radio" name="primaryMood" value="bad" /> Bad
          </label>
        </div>
        <div className="form-input text">
          <label>
            Add a few words to describe why you feel like that
            <textarea name="text"></textarea>
          </label>
        </div>
      </form>
    </Modal>
  );
}

export default MoodModal;
