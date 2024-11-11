import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async countByUserId(userId: string): Promise<number> {
    return prisma.checkIn.count({
      where: { user_id: userId },
    })
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    return prisma.checkIn.create({ data })
  }

  async findById(id: string): Promise<CheckIn | null> {
    return prisma.checkIn.findUnique({
      where: { id },
    })
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfOfTheDay = dayjs(date).endOf('date')

    return prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfOfTheDay.toDate(),
        },
      },
    })
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async save(data: CheckIn): Promise<CheckIn> {
    return prisma.checkIn.update({
      where: { id: data.id },
      data,
    })
  }
}
