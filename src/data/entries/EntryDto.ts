export type PrimaryMood = "good" | "neutral" | "bad";

export interface EntryDto {
  _id: string;
  timestamp: Date;
  primaryMood: PrimaryMood;
  secondaryMoods: string[];
  text: string;
  behavioralActivation?: {
    action: string;
    timestamp: Date;
    done?: boolean;
  };
}

export type EntryCreationData = Omit<EntryDto, "_id" | "timestamp">;
