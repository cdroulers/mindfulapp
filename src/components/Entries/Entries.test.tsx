import React from "react";
import { render, screen } from "@testing-library/react";
import Entries from "./Entries";
import { EntryDto } from "../../data/entries/EntryDto";
import { EntryDtoBuilder } from "../../data/entries/__tests__/EntryDtoBuilder";

const entry1 = new EntryDtoBuilder().build();
const entry2: EntryDto = new EntryDtoBuilder()
  .withTimestamp(new Date("2022-12-25T12:00:00Z"))
  .build();

describe("Entries", () => {
  test("groups by date", () => {
    render(
      <Entries
        entries={[entry1, entry2]}
        updateEntry={jest.fn()}
        markBehavioralActivationAsDone={jest.fn()}
      />
    );
    expect(screen.getByText("2022-12-24")).toBeInTheDocument();
    expect(screen.getByText("2022-12-25")).toBeInTheDocument();
  });
});
