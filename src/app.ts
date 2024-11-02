import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Alice',
    email: 'alice@alice.com',
  },
})

export const app = fastify()
