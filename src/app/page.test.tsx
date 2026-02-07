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

  test("Page loads fallback data when database fails", async () => {
    // Mock database error
    mockUserRepository.getAllUsers.mockRejectedValue(new Error("Database error"));

    render(await Page());
    
    expect(screen.getAllByRole("heading", { level: 1 })[0].textContent).toContain(
      "Welcome"
    );
    
    const users = await screen.findAllByRole("listitem");
    expect(users).toHaveLength(3); // Fallback users
    expect(users[0].textContent).toContain("Alice");
    expect(users[1].textContent).toContain("Bob");
    expect(users[2].textContent).toContain("Charlie");
  });
});