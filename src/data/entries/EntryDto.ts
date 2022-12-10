export type PrimaryMood = "good" | "neutral" | "bad";

export interface EntryDto {
  _id: string;
  timestamp: string;
  primaryMood: PrimaryMood;
  secondaryMoods: string[];
  text: string;
}

export type EntryCreationData = Omit<EntryDto, "_id" | "timestamp">;
