import 'reflect-metadata';
import { container } from 'tsyringe';
import { PrismaUserRepository } from '@headache/adapter/prisma/prismaUserRepository';
import { UserRepository } from '@headache/domain/repositories/userRepository';

// Register dependencies
container.registerSingleton<UserRepository>('UserRepository', PrismaUserRepository);

export { container };