import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { AppError } from './http/errors/AppError'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (error instanceof AppError) {
    return reply
      .status(Number(error.statusCode))
      .send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external toll like DataDog/NewRelic/Sentry
  }
})
