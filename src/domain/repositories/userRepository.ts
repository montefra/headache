import { User } from "../models/user";

export interface UserRepository {
  getByEmail(email: string): Promise<User>;
  getAllUsers(): Promise<User[]>;
  create(user: Omit<User, 'id'>): Promise<User>;
}