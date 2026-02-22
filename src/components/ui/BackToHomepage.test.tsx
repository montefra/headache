import { describe, expect, test, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import BackToHomepage from "./BackToHomepage";

describe("BackToHomepage Component", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders link to homepage", () => {
    render(<BackToHomepage />);
    
    const link = screen.getByRole("link", { name: /back to homepage/i });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/");
  });

});
