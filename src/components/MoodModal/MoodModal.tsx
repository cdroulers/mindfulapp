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
import { getEmotions } from "../../data/emotions";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

const emotions = getEmotions();

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
  const [t] = useTranslation(["MoodModal", "Emotions", "Shared"]);
  const [entry, setEntry] = useState<EntryCreationData>(defaultEntry);

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as unknown as HTMLInputElement;
    let name = target.name;
    let value: string | string[] = target.value;
    if (name === "secondaryMoods") {
      if (target.checked) {
        value = [...entry.secondaryMoods, value];
      } else {
        value = entry.secondaryMoods.filter((x) => x !== value);
      }
    }
    const others: Partial<EntryCreationData> = {};
    if (name === "primaryMood") {
      others.secondaryMoods = [];
    }

    if (name === "behavioralActivation.action") {
      const timestamp = new Date();
      timestamp.setDate(timestamp.getDate() + 1);
      let activation = undefined;
      if (value) {
        activation = {
          action: value as string,
          timestamp,
        };
      }
      setEntry({
        ...entry,
        ...others,
        behavioralActivation: activation,
      });
    } else {
      setEntry({ ...entry, ...others, [name]: value });
    }
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
      <p id="secondaryMoods-label">{t("secondaryMoods.label")}</p>
      <div className="form-input mood">
        <FormControl>
          <FormGroup>
            {emotions[entry.primaryMood].map((x) => (
              <FormControlLabel
                key={x.code}
                control={
                  <Checkbox
                    name="secondaryMoods"
                    value={x.code}
                    checked={entry.secondaryMoods.includes(x.code)}
                  />
                }
                label={t("Emotions:" + entry.primaryMood + "." + x.code)}
              />
            ))}
          </FormGroup>
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
      <h3>{t("Shared:behavioralActivation")}</h3>
      <div className="form-input text">
        <FormControl>
          <p id="text-label">{t("MoodModal:behavioralActivation.action.label")}</p>
          <TextField
            aria-labelledby="text-label"
            multiline
            maxRows={5}
            name="behavioralActivation.action"
            value={entry.behavioralActivation?.action}
          />
        </FormControl>
      </div>
    </form>
  );
}
