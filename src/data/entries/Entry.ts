export type PrimaryMood = "good" | "neutral" | "bad";

export interface Entry {
  _id: string;
  timestamp: string;
  primaryMood: PrimaryMood;
  secondaryMoods: string[];
  text: string;
}

export type EntryCreationData = Omit<Entry, "_id" | "timestamp">;
