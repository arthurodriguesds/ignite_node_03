import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { AppError } from '../../http/errors/AppError'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const findConflictingEmail = await this.usersRepository.findByEmail(email)

    if (findConflictingEmail) {
      throw new AppError({
        error: {
          message: 'Email inválido.',
          errorCode: 1,
          statusCode: 409,
        },
      })
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })

    return { user }
  }
}
