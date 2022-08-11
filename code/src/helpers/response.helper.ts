import { Response } from 'express'
import { ExceptionCode } from '../exceptions'

interface IResponse {
  res: Response
  data?: any
  status_code?: number
  message?: string
}

interface IResponseError {
  res: Response
  status_code?: number
  message?: string
  exception_code: ExceptionCode
}

export const responseSuccess = ({
  res,
  data,
  status_code,
  message,
}: IResponse) => {
  const statusCode = status_code || 200

  return res.status(statusCode).json({
    success: true,
    message: message || 'SUCCESS',
    data,
  })
}

export const responseError = ({
  res,
  status_code,
  message,
  exception_code,
}: IResponseError) => {
  const statusCode = status_code || 500

  return res.status(statusCode).json({
    success: false,
    message,
    exception_code,
  })
}

export const responseHelper = () => {
  return {
    responseSuccess,
    responseError,
  }
}
