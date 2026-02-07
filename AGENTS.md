# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Project Overview

This is a Next.js 15 application using TypeScript, Prisma ORM, and PostgreSQL following Clean Architecture principles. The project separates domain logic from infrastructure concerns.

## Development Commands

### Essential Commands
```bash
# Start development server with Turbopack
npm run dev

# Build for production  
npm run build

# Start production server
npm run start

# Run tests
npm run test

# Run tests with coverage
npm run coverage

# Run linter
npm run lint
```

### Database Commands
```bash
# Start PostgreSQL container
docker compose --project-directory docker up -d

# Generate Prisma client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev

# Seed database
npx prisma db seed

# Reset database
npx prisma migrate reset
```

### Testing Individual Files
```bash
# Run specific test file
npx vitest path/to/test.test.ts

# Run in watch mode
npx vitest --watch

# Run with coverage for specific file
npx vitest --coverage path/to/test.test.ts
```

## Architecture Guidelines

### Directory Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/domain/` - Business logic, models, repositories interfaces
- `src/adapter/` - Infrastructure implementations (Prisma adapters)
- `prisma/` - Database schema and migrations

### Clean Architecture Principles
- Domain layer contains only business logic and interfaces
- Adapters implement domain interfaces using external dependencies
- Never import from adapters into domain layer
- Use dependency injection from app layer into domain

## Code Style Guidelines

### Naming Conventions
- **Components**: PascalCase (UserProfile, LayoutComponent)
- **Functions/Variables**: camelCase (getUserData, isOnline)
- **Files**: descriptive names with type suffixes (user.test.ts, UserRepository.ts)
- **Constants**: UPPER_SNAKE_CASE (API_BASE_URL, MAX_RETRIES)

### Import/Export Patterns
```typescript
// Use path aliases for infrastructure imports
import { prisma } from '@headache/adapter/prisma/client'
import { User } from '@headache/domain/models/user'

// Use relative imports within domain layer
import { User } from '../models/user'
import { UserRepository } from '../repositories/user'

// Type-only imports
import type { User } from '../models/user'

// Named exports for utilities
export { validateEmail, formatDate }

// Default exports for components
export default UserProfile
```

### TypeScript Guidelines
- Strict mode enabled - always provide explicit types
- Use interfaces for object shapes, types for unions/primitives
- Prefer `unknown` over `any` for dynamic data
- Use generic types with proper constraints

### React/Next.js Guidelines
- Use async components for data fetching in App Router
- Server components by default, add 'use client' for interactivity
- Use `React.ReactNode` for component children prop type
- Implement proper loading and error boundaries

## Database & ORM Guidelines

### Prisma Best Practices
```typescript
// Always use generated client types
import type { User, Post } from '@prisma/client'

// Use transactions for multi-step operations
await prisma.$transaction(async (tx) => {
  await tx.user.create({ data: userData })
  await tx.profile.create({ data: profileData })
})

// Use select for efficient queries
const user = await prisma.user.findUnique({
  where: { id },
  select: { id: true, name: true, email: true }
})
```

### Repository Pattern
- Define repository interfaces in `src/domain/repositories/`
- Implement using Prisma adapters in `src/adapter/prisma/`
- Always return domain models, not Prisma types

## Error Handling

### Custom Error Classes
```typescript
// Extend base error classes properly
export class UserNotFoundError extends Error {
  constructor(id: string) {
    super(`User not found: ${id}`)
    this.name = 'UserNotFoundError'
  }
}

// Use specific errors from domain layer
throw new UserNotFoundError(userId)
```

### Error Handling Patterns
- Use try-catch blocks at repository boundaries
- Log errors with appropriate context
- Return consistent error responses from API routes
- Validate input data before processing

## Testing Guidelines

### Test Structure
```typescript
// Use describe/it/expect pattern
describe('UserRepository', () => {
  it('should create user successfully', async () => {
    // Arrange
    const userData = { name: 'John', email: 'john@example.com' }
    
    // Act
    const user = await repository.create(userData)
    
    // Assert
    expect(user).toBeDefined()
    expect(user.name).toBe(userData.name)
  })
})
```

### Testing Best Practices
- Use Vitest and React Testing Library
- Mock external dependencies (database, APIs)
- Test both happy path and error scenarios
- Keep tests focused and single-purpose
- Use descriptive test names

## Linting & Formatting

- ESLint with Next.js and Prettier configs
- Auto-format on save (Prettier integration)
- Run `npm run lint` before committing
- Fix any linting errors before submitting PR

## Environment Setup

### Required Environment Variables
```bash
# Database connection
DATABASE_URL="postgresql://user:password@localhost:5442/headache?schema=headache"

# Next.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### Development Workflow
1. Start PostgreSQL container
2. Install dependencies and generate Prisma client
3. Run migrations and seed database
4. Start development server
5. Run tests and linting frequently

## Common Patterns

### API Routes (App Router)
```typescript
export async function GET(request: Request) {
  try {
    const data = await someOperation()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Server Components
```typescript
export default async function UserProfile({ userId }: { userId: string }) {
  const user = await getUserById(userId)
  
  if (!user) {
    notFound()
  }
  
  return <div>{user.name}</div>
}
```

Remember: Always follow the established patterns, write tests for new functionality, and ensure the codebase remains clean and maintainable.