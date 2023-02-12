import { UpdateEntryCallback } from "../../MoodModal/dependencies";

export type MarkBehavioralActivationAsDoneCallback = (entryId: string) => Promise<void>;

export type EntryDependencies = {
  markBehavioralActivationAsDone: MarkBehavioralActivationAsDoneCallback;
  updateEntry: UpdateEntryCallback;
};
