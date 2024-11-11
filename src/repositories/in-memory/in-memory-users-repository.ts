import { UsersRepository } from '@/repositories/users-repository'
import { Prisma, User } from '@prisma/client'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: '1',
      name: data.name,
      email: data.email,
      phone: null,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((user) => user.email === email) || null
  }

  async findById(id: string): Promise<User | null> {
    return this.items.find((user) => user.id === id) || null
  }
}
