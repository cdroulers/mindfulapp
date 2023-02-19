import { EntryDto } from "../../data/entries/EntryDto";
import { AddEntryCallback, UpdateEntryCallback } from "./dependencies";

export interface MoodModalProps {
  visible?: boolean;
  adding?: {
    addEntry: AddEntryCallback;
    previousEntry?: EntryDto;
  };
  updating?: {
    updateEntry: UpdateEntryCallback;
    entry: EntryDto;
  };
  onClose?: () => void;
}
