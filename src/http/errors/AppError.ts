import { IErrorReply } from './error-index'

export class AppError {
  public readonly error: IErrorReply

  constructor(error: IErrorReply) {
    this.error = error
  }
}
