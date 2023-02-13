import React from "react";
import { render, screen } from "@testing-library/react";
import MoodModal from "./MoodModal";
import { getDefaultEntry } from "../../data/entries/__tests__/stubs";

const defaultEntry = getDefaultEntry();

describe("MoodModal", () => {
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
