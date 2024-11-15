import fastify from 'fastify'
import { appRoutes } from '@/http/routes'
import { ZodError } from 'zod'
import { env } from '@/env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    reply.code(400).send({ message: error.errors, issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  reply.code(500).send({ message: 'Internal server error' })
})
