import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register-client/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const prismaUsersRepository = new PrismaUsersRepository()

  const registerUseCase = new RegisterUseCase(prismaUsersRepository)

  await registerUseCase.execute({ name, email, password })

  return reply.status(201).send()
}