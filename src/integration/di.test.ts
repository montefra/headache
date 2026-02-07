import { describe, expect, test, vi, beforeAll } from "vitest";
import { container } from "@headache/di/container";
import { UserRepository } from "@headache/domain/repositories/userRepository";

// Mock the Prisma client for integration tests
vi.mock("@headache/adapter/prisma/client", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
    },
  },
}));

describe("Dependency Injection Integration", () => {
  let userRepository: UserRepository;

  beforeAll(() => {
    // Resolve UserRepository from DI container
    userRepository = container.resolve<UserRepository>("UserRepository");
  });

  test("DI container resolves UserRepository correctly", () => {
    expect(userRepository).toBeDefined();
    expect(userRepository.getAllUsers).toBeDefined();
    expect(userRepository.getByEmail).toBeDefined();
    expect(userRepository.create).toBeDefined();
  });

  test("DI container provides singleton instance", () => {
    const secondInstance = container.resolve<UserRepository>("UserRepository");
    expect(userRepository).toBe(secondInstance);
  });

  test("Resolved UserRepository works with mocked dependencies", async () => {
    const { prisma } = await import("@headache/adapter/prisma/client");
    
    // Mock successful user fetch
    const mockUsers = [
      { id: "1", name: "Alice", email: "alice@example.com" },
      { id: "2", name: "Bob", email: "bob@example.com" },
    ];
    prisma.user.findMany = vi.fn().mockResolvedValue(mockUsers);

    const users = await userRepository.getAllUsers();
    
    expect(users).toEqual(mockUsers);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });
});