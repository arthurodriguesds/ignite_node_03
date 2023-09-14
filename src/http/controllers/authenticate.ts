import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate/authenticate'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = registerBodySchema.parse(request.body)

  const prismaUsersRepository = new PrismaUsersRepository()

  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

  await authenticateUseCase.execute({ email, password })

  return reply.status(200).send()
}
