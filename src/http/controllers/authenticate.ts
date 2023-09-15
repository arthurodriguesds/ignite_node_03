import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '@/use-cases/register-client/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = registerBodySchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()

  await authenticateUseCase.execute({ email, password })

  return reply.status(200).send()
}
