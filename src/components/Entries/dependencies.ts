import { UpdateEntryCallback } from "../MoodModal/dependencies";
import { EntryDependencies } from "./Entry/dependencies";

export type EntriesDependencies = Omit<EntryDependencies, "onEditClick"> & {
  updateEntry: UpdateEntryCallback;
};
