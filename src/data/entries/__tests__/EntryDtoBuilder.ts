import { EntryDto } from "../EntryDto";

export class EntryDtoBuilder {
  private entry: Partial<EntryDto> = {};

  public withTimestamp(timestamp: Date): EntryDtoBuilder {
    this.entry.timestamp = timestamp;

    return this;
  }

  build(): EntryDto {
    return {
      _id: "lol",
      timestamp: new Date("2022-12-24T12:00:00Z"),
      primaryMood: "good",
      secondaryMoods: ["excited"],
      text: "dear boy",
      ...this.entry,
      behavioralActivation: {
        action: "Talk a walk",
        timestamp: new Date("2022-12-26T17:00:00Z"),
        ...(this.entry.behavioralActivation || {}),
      },
    };
  }
}
