import {
  FindManyNearbyParams,
  GymsRepository,
} from '@/repositories/gyms-repository'
import { Prisma, Gym } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym> {
    return prisma.gym.create({ data })
  }

  findById(id: string): Promise<Gym | null> {
    return prisma.gym.findUnique({
      where: { id },
    })
  }

  searchMany(query: string, page: number): Promise<Gym[]> {
    return prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    return prisma.$queryRaw`
        SELECT * FROM gyms
        WHERE ( 6371 * acos( cos( radians(${params.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
  }
}
