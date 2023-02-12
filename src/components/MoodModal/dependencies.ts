import { EntryCreationData, EntryUpdateData } from "../../data/entries/EntryDto";

export type AddEntryCallback = (
  entry: EntryCreationData,
  markPreviousAsDone: boolean
) => Promise<void>;

export type UpdateEntryCallback = (id: string, entry: EntryUpdateData) => Promise<void>;
