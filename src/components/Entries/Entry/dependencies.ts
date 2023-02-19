import { EntryDto } from "../../../data/entries/EntryDto";

export type MarkBehavioralActivationAsDoneCallback = (entryId: string) => Promise<void>;

export type EntryDependencies = {
  markBehavioralActivationAsDone: MarkBehavioralActivationAsDoneCallback;
  onEditClick: (entry: EntryDto) => void;
};
