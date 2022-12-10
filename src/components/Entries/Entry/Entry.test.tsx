import React from "react";
import { render, screen } from "@testing-library/react";
import Entry from "./Entry";
import { EntryDto } from "../../../data/entries/EntryDto";

const defaultEntry: EntryDto = {
  _id: "lol",
  timestamp: "2022-12-25T00:00:00Z",
  primaryMood: "good",
  secondaryMoods: ["oh my"],
  text: "dear boy",
};

describe("Entries/Entry", () => {
  test("renders with content", () => {
    render(<Entry entry={defaultEntry} />);
    expect(screen.getByText(defaultEntry.text)).toBeInTheDocument();
    expect(screen.getByText(defaultEntry.primaryMood)).toBeInTheDocument();
    expect(screen.getByText(defaultEntry.secondaryMoods[0])).toBeInTheDocument();
  });
});
