import { describe, it, expect, vi, afterEach } from "vitest";
import { PrismaUserRepository } from "./prismaUserRepository";
import { prisma } from "./client";
import { User } from "@headache/generated/prisma";
import { UserNotFoundError } from "@headache/domain/errors";

vi.mock("./client", () => ({
  prisma: {
    user: {
      create: vi.fn(),
    },
  },
}));

const alice: User = {
  id: "id",
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const bob: User = {
  id: "id2",
  name: "Bob",
  email: "bob@example.com",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("PrismaUserRepository", () => {
  const repo = new PrismaUserRepository();

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("getByEmail", () => {
    it("returns user if found", async () => {
      prisma.user.findUnique = vi.fn().mockResolvedValue(alice);

      const user = await repo.getByEmail("alice@example.com");

      expect(prisma.user.findUnique).toHaveBeenCalled();
      expect(user).toEqual(alice);
    });

    it("throws if user not found", async () => {
      prisma.user.findUnique = vi.fn();

      const underTest = () => repo.getByEmail("bob@example.com");

      await expect(underTest).rejects.toThrow(UserNotFoundError);
    });
  });

  describe("getAllUsers", () => {
    it("returns users", async () => {
      prisma.user.findMany = vi.fn().mockResolvedValue([alice, bob]);

      const result = await repo.getAllUsers();

      expect(prisma.user.findMany).toHaveBeenCalled();
      expect(result).toEqual([alice, bob]);
    });
  });

  describe("create", () => {
    it("calls prisma.user.create", async () => {
      const newUser = { name: "Charlie", email: "charlie@example.com" };
      prisma.user.create = vi.fn().mockResolvedValue(bob);

      const result = await repo.create(newUser);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: newUser,
      });
      expect(result).toEqual(bob);
    });
  });
});
