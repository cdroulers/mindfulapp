import React from "react";
import { render, screen } from "@testing-library/react";
import Entry from "../Entry";
import { EntryDtoBuilder } from "../../../../data/entries/__tests__/EntryDtoBuilder";
import { EntryPageObject } from "./EntryPageObject";

const defaultEntry = new EntryDtoBuilder().withSecondaryMoods(["excited", "happy"]).build();

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
        data-testid="entry"
      />
    );
    const wrapper = new EntryPageObject(screen.getByTestId("entry"));
    wrapper
      .shouldHaveText(defaultEntry.text)
      .and.shouldHavePrimaryMood("Good")
      .and.shouldHaveSecondaryMoods(["Excited", "Happy"])
      .and.shouldHaveBehavioralActivationText(defaultEntry.behavioralActivation!.action);
  });

  test("Buttons do callbacks", async () => {
    render(
      <Entry
        entry={defaultEntry}
        onEditClick={onEditClick}
        markBehavioralActivationAsDone={markAsDoneClick}
        data-testid="entry"
      />
    );

    const wrapper = new EntryPageObject(screen.getByTestId("entry"));

    await wrapper.clickEdit();
    expect(onEditClick).toHaveBeenCalledWith(defaultEntry);
    await wrapper.clickDidIt();
    expect(markAsDoneClick).toHaveBeenCalledWith(defaultEntry._id);
  });
});
