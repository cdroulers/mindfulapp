import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import { EntryCreationData, EntryUpdateData } from "../../../data/entries/EntryDto";
import { getEmotions } from "../../../data/emotions";

import "../MoodModal.styles.scss";
import { MoodModalFormProps } from "./types";

const emotions = getEmotions();

function getDefaultTimestamp() {
  const d = new Date();
  d.setHours(12);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}

const getDefaultEntry = (): EntryCreationData => ({
  primaryMood: "neutral",
  secondaryMoods: [],
  text: "",
  behavioralActivation: {
    action: "",
    timestamp: getDefaultTimestamp(),
  },
});

// Small optimization to avoid re-renders.
function MoodModalForm({ onClose, adding, updating }: MoodModalFormProps): JSX.Element {
  const [t] = useTranslation(["MoodModal", "Emotions", "Shared"]);
  const [entry, setEntry] = useState<EntryUpdateData>(updating?.entry || getDefaultEntry());
  const [previousDone, setPreviousDone] = useState<boolean>(
    updating?.entry.behavioralActivation?.done || false
  );

  const isUpdating = Boolean(updating);

  const previousEntry = adding?.previousEntry || updating?.entry;

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as unknown as HTMLInputElement;
    const name = target.name;
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

    if (name.startsWith("behavioralActivation")) {
      const behavioralActivation = entry.behavioralActivation!;
      if (name.endsWith(".action")) {
        behavioralActivation.action = value as string;
      } else if (name.endsWith(".timestamp")) {
        value = value as string;
        behavioralActivation.timestamp.setHours(parseInt(value.substring(0, 2)));
        behavioralActivation.timestamp.setMinutes(parseInt(value.substring(3, 5)));
      } else if (name.endsWith(".done")) {
        setPreviousDone(target.checked);
      }
      setEntry({ ...entry, behavioralActivation });
    } else {
      setEntry({ ...entry, ...others, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!entry.behavioralActivation?.action) {
      delete entry.behavioralActivation;
    }

    if (isUpdating && entry.behavioralActivation) {
      entry.behavioralActivation.done = previousDone;
    }

    if (adding) {
      adding.addEntry(entry, previousDone).then(() => {
        setEntry(getDefaultEntry());
        setPreviousDone(false);
        onClose?.call(null);
      });
    } else if (updating) {
      updating.updateEntry(previousEntry!._id, entry).then(() => {
        setEntry(getDefaultEntry());
        onClose?.call(null);
      });
    }
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
              control={<Radio checked={entry.primaryMood === "good"} />}
              label={t("Shared:primaryMood.good")}
            />
            <FormControlLabel
              value="neutral"
              control={<Radio checked={entry.primaryMood === "neutral"} />}
              label={t("Shared:primaryMood.neutral")}
            />
            <FormControlLabel
              value="bad"
              control={<Radio checked={entry.primaryMood === "bad"} />}
              label={t("Shared:primaryMood.bad")}
            />
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
            inputProps={{ "aria-labelledby": "text-label" }}
            multiline
            maxRows={5}
            name="text"
            value={entry.text}
          />
        </FormControl>
      </div>
      <h2>{t("Shared:behavioralActivation")}</h2>
      <div className="form-input text">
        <FormControl>
          <p id="action-label">{t("MoodModal:behavioralActivation.action.label")}</p>
          <TextField
            inputProps={{ "aria-labelledby": "action-label" }}
            name="behavioralActivation.action"
            value={entry.behavioralActivation?.action}
          />
        </FormControl>
      </div>
      <div className="form-input text">
        <FormControl>
          <p id="action-timestamp-label">{t("MoodModal:behavioralActivation.timestamp.label")}</p>
          <TextField
            inputProps={{ "aria-labelledby": "action-timestamp-label", role: "textbox" }}
            type="time"
            name="behavioralActivation.timestamp"
            value={entry.behavioralActivation?.timestamp.toTimeString().substring(0, 5)}
          />
        </FormControl>
      </div>
      {previousEntry &&
        !isUpdating &&
        previousEntry.behavioralActivation &&
        !previousEntry.behavioralActivation.done && (
          <div>
            <h3>{t("MoodModal:behavioralActivation.previousEntry")}</h3>
            <div className="form-input">
              <FormControl>
                <p id="action-previous-done-label">
                  {t("MoodModal:behavioralActivation.yesterdayAction", {
                    date: previousEntry.behavioralActivation.timestamp,
                  })}
                </p>
                <Typography
                  sx={{ display: "inline" }}
                  component="div"
                  variant="body1"
                  color="text.secondary"
                  fontSize={"0.9em"}>
                  {previousEntry.behavioralActivation.action}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="behavioralActivation.done"
                      value="done"
                      checked={previousDone}
                    />
                  }
                  label={t("MoodModal:behavioralActivation.didYouDoIt")}
                />
              </FormControl>
            </div>
          </div>
        )}
      {previousEntry && isUpdating && previousEntry.behavioralActivation && (
        <div className="form-input text">
          <FormControlLabel
            control={
              <Checkbox name="behavioralActivation.done" value="done" checked={previousDone} />
            }
            label={t("MoodModal:behavioralActivation.didYouDoIt")}
          />
        </div>
      )}
    </form>
  );
}

export default MoodModalForm;
