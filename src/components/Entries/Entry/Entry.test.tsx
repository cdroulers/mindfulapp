import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Entry from "./Entry";
import { EntryDtoBuilder } from "../../../data/entries/__tests__/EntryDtoBuilder";

const defaultEntry = new EntryDtoBuilder().build();

describe("Entries/Entry", () => {
  let onEditClick = jest.fn(),
    markAsDoneClick = jest.fn();
  beforeEach(() => {
    onEditClick = jest.fn();
    markAsDoneClick = jest.fn();
  });

  test("renders with content", () => {
    render(
      <Entry
        entry={defaultEntry}
        onEditClick={onEditClick}
        markBehavioralActivationAsDone={markAsDoneClick}
      />
    );
    expect(screen.getByText(defaultEntry.text)).toBeInTheDocument();
    expect(screen.getByText("Good")).toBeInTheDocument();
    expect(screen.getByText("Excited")).toBeInTheDocument();

    expect(screen.getByText(defaultEntry.behavioralActivation!.action)).toBeInTheDocument();
  });

  test("Buttons do callbacks", () => {
    render(
      <Entry
        entry={defaultEntry}
        onEditClick={onEditClick}
        markBehavioralActivationAsDone={markAsDoneClick}
      />
    );

    const didItBtns = screen.getAllByRole("button");
    expect(didItBtns).toHaveLength(2);
    const [editBtn, didItBtn] = didItBtns;
    fireEvent.click(editBtn);
    expect(onEditClick).toHaveBeenCalledWith(defaultEntry);
    fireEvent.click(didItBtn);
    expect(markAsDoneClick).toHaveBeenCalledWith(defaultEntry._id);
  });
});
