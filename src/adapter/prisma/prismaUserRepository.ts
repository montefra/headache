import { UserRepository } from '@headache/domain/repositories/userRepository';
import { User } from '@headache/domain/models/user';
import { prisma } from './client';
import { UserNotFoundError } from '@headache/domain/errors';
import { injectable } from 'tsyringe';

@injectable()
export class PrismaUserRepository implements UserRepository {
    constructor() {
    }

    async getByEmail(email: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new UserNotFoundError(email);
        }
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        return await prisma.user.findMany();
    }

    create(user: Omit<User, 'id'>): Promise<User> {
        return prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
            }
        });
    }

}