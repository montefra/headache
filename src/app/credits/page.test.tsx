import { describe, expect, test, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Credits from "./page";

vi.mock("@headache/components/ui/BackToHomepage", () => ({
  default: () => <a href="/">Back to Homepage</a>,
}));

describe("Credits Page", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders credits heading", () => {
    render(<Credits />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Credits",
    );
  });

  test("renders both credit items in a list", () => {
    render(<Credits />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
  });
});
