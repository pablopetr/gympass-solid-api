import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '@/repositories/prisma/users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { email },
    })

    return user
  }
}
