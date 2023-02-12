import React from "react";
import { render, screen } from "@testing-library/react";
import Entry from "./Entry";
import { getDefaultEntry } from "../../../data/entries/__tests__/stubs";

const defaultEntry = getDefaultEntry();

describe("Entries/Entry", () => {
  test("renders with content", () => {
    render(
      <Entry
        entry={defaultEntry}
        updateEntry={jest.fn()}
        markBehavioralActivationAsDone={jest.fn()}
      />
    );
    expect(screen.getByText(defaultEntry.text)).toBeInTheDocument();
    expect(screen.getByText("Good")).toBeInTheDocument();
    expect(screen.getByText("good." + defaultEntry.secondaryMoods[0])).toBeInTheDocument();

    expect(screen.getByText(defaultEntry.behavioralActivation!.action)).toBeInTheDocument();
  });
});
