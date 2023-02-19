import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MoodModal from "./MoodModal";
import { getDefaultEntry } from "../../data/entries/__tests__/stubs";

const defaultEntry = getDefaultEntry();

describe("MoodModal", () => {
  describe("Buttons", () => {
    it("closes Modal on X", () => {
      const onClose = jest.fn();
      render(
        <MoodModal
          visible
          onClose={onClose}
          adding={{
            addEntry: jest.fn(),
          }}
        />
      );
      fireEvent.click(screen.getByTestId("CloseIcon"));
      expect(onClose).toHaveBeenCalled();
    });

    it("closes Modal on Cancel button", () => {
      const onClose = jest.fn();
      render(
        <MoodModal
          visible
          onClose={onClose}
          adding={{
            addEntry: jest.fn(),
          }}
        />
      );
      fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe("Adding entry", () => {
    test("renders with proper title", () => {
      render(
        <MoodModal
          visible
          onClose={jest.fn()}
          adding={{
            addEntry: jest.fn(),
          }}
        />
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Add entry" })).toBeInTheDocument();
    });
  });

  describe("Updating entry", () => {
    test("renders with proper title", () => {
      render(
        <MoodModal
          visible
          onClose={jest.fn()}
          updating={{
            updateEntry: jest.fn(),
            entry: defaultEntry,
          }}
        />
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      // Not checking day and time to avoid timezone issues!
      expect(screen.getByRole("heading", { name: /Updating entry 2022-12.*/ })).toBeInTheDocument();
    });
  });
});
