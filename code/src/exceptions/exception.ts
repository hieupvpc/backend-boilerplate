import ExceptionCode from './exceptionCode'
import i18n from 'i18n'
import _ from 'lodash'

interface IObject {
  [k: string]: string
}

interface IErrorMessageParams {
  phrase: string
  locale?: string
  replace?: IObject
}

class Exception extends Error {
  public name: string
  public code: number
  public status_code: number

  constructor(
    _message: string | IErrorMessageParams,
    code: ExceptionCode = ExceptionCode.UNKNOWN,
    status_code: number = 500,
    _locale: string = 'VI',
  ) {
    let locale = _locale
    let message: string = ''

    if (_.isObject(_message)) {
      if (_message.locale) {
        locale = _message.locale
      }

      const replaceOptions =
        _message.replace && !_.isEmpty(_message.replace) ? _message.replace : {}

      message = i18n.__(
        {
          phrase: _message.phrase,
          locale,
        },
        replaceOptions,
      )
    } else {
      message = i18n.__({ phrase: _message, locale })
    }

    super(message)

    Error.captureStackTrace(this, this.constructor)

    this.name = 'Exception'

    this.code = code

    this.status_code = status_code
  }
}

export default Exception
