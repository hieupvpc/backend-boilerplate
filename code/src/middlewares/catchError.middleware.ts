import { ICradle } from '../container'
import { Request, Response, NextFunction } from 'express'
import { ExceptionCode } from '../exceptions'

export const catchErrorMiddlware = (iCradle: ICradle) => {
  const { helpers } = iCradle

  const catchError = (
    err: { message?: string; code?: number; status_code?: number; stack: any },
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const defaultMessage = `Có lỗi xảy ra, vui lòng thử lại sau`
    const defaultExceptionCode = ExceptionCode.UNKNOWN
    let message = ''
    let exceptionCode: number = 0
    let statusCode = 0

    if (err.message) {
      message = err.message
    }

    if (err.code) {
      exceptionCode = err.code
    }

    if (err.status_code) {
      statusCode = err.status_code
    }

    return helpers.responseHelper.responseError({
      res,
      status_code: statusCode,
      message: message || defaultMessage,
      exception_code: exceptionCode || defaultExceptionCode,
    })
  }

  return {
    catchError,
  }
}
