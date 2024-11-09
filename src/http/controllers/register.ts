import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCaseInstance = new RegisterUseCase(prismaUsersRepository)

    await registerUseCaseInstance.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      reply.code(409).send({ message: err.message })
    }

    // @ts-ignore
    reply.code(500).send({ message: err.message }) // TODO: handle other errors
  }

  reply.code(201).send()
}
