export class PersistenceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PersistenceError';
    Object.setPrototypeOf(this, PersistenceError.prototype);
  }
}

export class UserNotFoundError extends PersistenceError {
  constructor(email: string) {
    super(`User with email ${email} not found.`);
    this.name = 'UserNotFoundError';
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}