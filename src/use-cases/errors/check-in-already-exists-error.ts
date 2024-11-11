export class CheckInAlreadyExistsError extends Error {
  constructor() {
    super('Check-in already exists')
  }
}
