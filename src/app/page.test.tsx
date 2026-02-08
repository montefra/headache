import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Page from "./page";
import { container } from "@headache/di/container";

// Mock the DI container
vi.mock("@headache/di/container", () => ({
  container: {
    resolve: vi.fn(),
  },
}));

// Mock UserRepository
const mockUserRepository = {
  getAllUsers: vi.fn(),
  getByEmail: vi.fn(),
  create: vi.fn(),
};

describe("Page Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (container.resolve as ReturnType<typeof vi.fn>).mockReturnValue(mockUserRepository);
  });

  afterEach(() => {
    cleanup();
  });
  
  test("Page loads successfully with users", async () => {
    // Mock successful user fetch
    const mockUsers = [
      { id: "1", name: "Alice", email: "alice@example.com" },
      { id: "2", name: "Bob", email: "bob@example.com" },
    ];
    mockUserRepository.getAllUsers.mockResolvedValue(mockUsers);

    render(await Page());
    
    expect(screen.getAllByRole("heading", { level: 1 })[0].textContent).toContain(
      "Welcome"
    );
    
    const users = await screen.findAllByRole("listitem");
    expect(users).toHaveLength(2);
    expect(users[0].textContent).toContain("Alice");
    expect(users[1].textContent).toContain("Bob");
  });

  test("Page throws error when database fails", async () => {
    // Mock database error
    mockUserRepository.getAllUsers.mockRejectedValue(new Error("Database error"));

    // The page should throw an error now instead of using fallback data
    await expect(Page()).rejects.toThrow("Database error");
  });
});