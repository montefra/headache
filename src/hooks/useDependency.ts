import { container } from '@headache/di/container';
import { useMemo } from 'react';
import { UserRepository } from '@headache/domain/repositories/userRepository';

export function useDependency<T>(token: string): T {
  return useMemo(() => container.resolve<T>(token), [token]);
}

// Type-safe hook for UserRepository
export function useUserRepository(): UserRepository {
  return useDependency<UserRepository>('UserRepository');
}