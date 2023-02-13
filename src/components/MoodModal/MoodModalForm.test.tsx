import React from "react";
import { render, screen } from "@testing-library/react";
import MoodModalForm from "./MoodModalForm";
import { getDefaultEntry } from "../../data/entries/__tests__/stubs";

const defaultEntry = getDefaultEntry();

describe("MoodModal/MoodModalForm", () => {
  describe("Adding entry", () => {
    test("renders with default values", () => {
      render(
        <MoodModalForm
          onClose={jest.fn(() => {})}
          adding={{
            addEntry: jest.fn(),
          }}
        />
      );
      expect(screen.getByLabelText("Tell us about how you feel right now")).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "Neutral" })).toBeChecked();
      expect(screen.getByRole("checkbox", { name: "Apathetic" })).not.toBeChecked();
      expect(screen.getByRole("checkbox", { name: "Bored" })).not.toBeChecked();
      expect(screen.getByRole("checkbox", { name: "Tired" })).not.toBeChecked();
      expect(screen.getByRole("checkbox", { name: "Sleepy" })).not.toBeChecked();
      expect(
        screen.getByRole("textbox", { name: "Add a few words to describe why you feel like that" })
      ).toHaveValue("");
      expect(
        screen.getByRole("textbox", {
          name: "Write down a small, enjoyable thing you can do tomorrow.",
        })
      ).toHaveValue("");
      expect(
        screen.getByRole("textbox", {
          name: "When will you do it?",
        })
      ).toHaveValue("12:00");
      expect(screen.queryByRole("checkbox", { name: "Did you do it?" })).not.toBeInTheDocument();
    });

    test("renders previous entry checkbox", () => {
      render(
        <MoodModalForm
          onClose={jest.fn()}
          adding={{
            addEntry: jest.fn(),
            previousEntry: defaultEntry,
          }}
        />
      );
      const didItCheckbox = screen.getByRole("checkbox", { name: "Did you do it?" });
      expect(didItCheckbox).toBeInTheDocument();
      expect(didItCheckbox).not.toBeChecked();
      expect(screen.getByText(defaultEntry.behavioralActivation!.action)).toBeInTheDocument();
    });
  });

  describe("Updating entry", () => {
    test("renders with existing values", () => {
      render(
        <MoodModalForm
          onClose={jest.fn()}
          updating={{
            entry: defaultEntry,
            updateEntry: jest.fn(),
          }}
        />
      );
      expect(screen.getByLabelText("Tell us about how you feel right now")).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "Neutral" })).not.toBeChecked();
      expect(screen.getByRole("radio", { name: "Good" })).toBeChecked();
      expect(screen.getByRole("checkbox", { name: "Excited" })).toBeChecked();
      expect(screen.getByRole("checkbox", { name: "Energetic" })).not.toBeChecked();
      expect(screen.getByRole("checkbox", { name: "Joyful" })).not.toBeChecked();
      expect(screen.getByRole("checkbox", { name: "Proud" })).not.toBeChecked();
      expect(
        screen.getByRole("textbox", { name: "Add a few words to describe why you feel like that" })
      ).toHaveValue(defaultEntry.text);
      expect(
        screen.getByRole("textbox", {
          name: "Write down a small, enjoyable thing you can do tomorrow.",
        })
      ).toHaveValue(defaultEntry.behavioralActivation?.action);
      expect(
        screen.getByRole("textbox", {
          name: "When will you do it?",
        })
      ).toHaveValue("12:00");
    });
    test("renders with behavioral activation checkbox", () => {
      render(
        <MoodModalForm
          onClose={jest.fn()}
          updating={{
            entry: {
              ...defaultEntry,
              behavioralActivation: {
                ...defaultEntry.behavioralActivation!,
                done: true,
              },
            },
            updateEntry: jest.fn(),
          }}
        />
      );

      expect(screen.getByRole("checkbox", { name: "Did you do it?" })).toBeInTheDocument();
    });
  });
});
