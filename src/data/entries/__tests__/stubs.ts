import { EntryDto } from "../EntryDto";

export function getDefaultEntry(): EntryDto {
  return {
    _id: "lol",
    timestamp: new Date("2022-12-25T00:00:00Z"),
    primaryMood: "good",
    secondaryMoods: ["excited"],
    text: "dear boy",
    behavioralActivation: {
      action: "Talk a walk",
      timestamp: new Date("2022-12-26T17:00:00Z"),
    },
  };
}
