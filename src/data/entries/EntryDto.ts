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

export type EntryUpdateData = Omit<EntryDto, "_id" | "timestamp">;

export type EntryCreationData = Omit<EntryUpdateData, "behavioralActivation"> & {
  behavioralActivation?: Omit<NonNullable<EntryDto["behavioralActivation"]>, "done">;
};
