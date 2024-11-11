export class TooLateToValidateCheckInError extends Error {
  constructor() {
    super('Invalid credentials.')
  }
}
