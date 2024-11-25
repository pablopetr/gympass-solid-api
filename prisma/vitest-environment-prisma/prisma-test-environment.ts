import 'dotenv/config'

import { Environment } from 'vitest'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { prisma } from '@/lib/prisma'

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>(<unknown>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    return {
      async teardown() {
        const schema = randomUUID()
        process.env.DATABASE_URL = generateDatabaseURL(schema)

        execSync('npx prisma migrate deploy')

        return {
          async tearDown() {
            await prisma.$executeRawUnsafe(
              `DROP SCHEMA IF EXISTS ${schema} CASCADE`,
            )

            await prisma.$disconnect()
          },
        }
      },
    }
  },
})
