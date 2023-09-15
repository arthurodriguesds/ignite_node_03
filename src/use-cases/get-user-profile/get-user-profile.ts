import { UsersRepository } from '@/repositories/users-repository'
import { AppError } from '../../http/errors/AppError'
import { User } from '@prisma/client'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError({
        error: {
          message: 'Usuário não encontrado.',
          errorCode: 4,
          statusCode: 404,
        },
      })
    }

    return { user }
  }
}
