import { UsersRepository } from '@/repositories/users-repository'
import { AppError } from '../../http/errors/AppError'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError({
        error: {
          message: 'Credenciais inválidas.',
          errorCode: 3,
          statusCode: 422,
        },
      })
    }

    const passwordMatches = await compare(password, user.password_hash)

    if (!passwordMatches) {
      throw new AppError({
        error: {
          message: 'Credenciais inválidas.',
          errorCode: 3,
          statusCode: 422,
        },
      })
    }

    return { user }
  }
}
