import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from '@/use-cases/fetch-user-check-ins-history'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()

  return new FetchUserCheckInsHistoryUseCase(checkInsRepository)
}
