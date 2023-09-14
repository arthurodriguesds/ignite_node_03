export interface IErrorReply {
  error:
    | { message: 'Email inválido'; statusCode: 409; errorCode: 1 }
    | { message: 'Cliente não encontrado'; statusCode: 404; errorCode: 2 }
    | { message: 'Credenciais inválidas'; statusCode: 422; errorCode: 3 }
}
