import Joi, { Types } from 'joi'
import { Exception, ExceptionCode } from '../exceptions'
import moment from 'moment-timezone'
import _ from 'lodash'

export const validation = () => {
  const formatErrorMessage = ({
    type,
    error_type,
    is_array,
    is_object,
  }: {
    type: Types
    error_type: string
    is_array?: boolean
    is_object?: boolean
  }) => {
    let prefix = 'JOI_VALIDATE'

    if (is_array) {
      prefix = 'JOI_VALIDATE_ARRAY'
    } else if (is_object) {
      prefix = 'JOI_VALIDATE_OBJECT'
    }

    const errorData: string[] = [
      prefix,
      type.toUpperCase(),
      error_type.toUpperCase(),
    ]

    return errorData.join('_')
  }

  const formatLabel = (label: string) => {
    let formattedLabel = label
    let is_array = false
    let is_object = false

    const regexArray = /\[|\]/g
    if (regexArray.test(formattedLabel)) {
      formattedLabel = formattedLabel.replace(/\[|\]|\d/g, '')
      is_array = true
    }

    const regexObject = /./g
    if (regexObject.test(formattedLabel)) {
      is_object = true
    }

    formattedLabel = capitalizeLabel(formattedLabel)

    return {
      label: formattedLabel,
      is_array,
      is_object,
    }
  }

  const capitalizeLabel = (label: string) => {
    return label.charAt(0).toUpperCase() + label.slice(1)
  }

  const joiDateNumber = () => {
    try {
      return Joi.extend((joi) => {
        return {
          type: 'dateNumber',
          base: joi.number(),
          messages: {
            'dateNumber.format': 'JOI_VALIDATE_OBJECT_DATENUMBER_FORMAT',
          },
          validate(value, helpers) {
            if (value === 0) {
              return
            }
            // Base validation regardless of the rules applied
            const strValue = _.toString(value)
            const date = moment(value, 'YYYYMMDD')
            if (strValue.length !== 8 || !date.isValid()) {
              return { value, errors: helpers.error('dateNumber.format') }
            }

            return
          },
        }
      })
    } catch (error) {
      console.log(error, 'parseDateNumberError')
      return
    }
  }

  const validate = (input: any, locale: string = 'VI') => {
    const valid = (joiSchema: {
      [k: string]: Joi.SchemaLike | Joi.SchemaLike[]
    }) => {
      const schema = Joi.object(joiSchema)

      const { error, value } = schema.validate(input, {
        allowUnknown: true,
      })

      if (error) {
        if (error.details.length) {
          const errorDetail = error.details[0]
          const { type: typeOrigin, context } = errorDetail

          const [type, errorType] = typeOrigin.split('.')

          if (type && errorType && context && context.label) {
            const {
              is_array: isArray,
              is_object: isObject,
              label,
            } = formatLabel(context.label)

            const errorMessage = formatErrorMessage({
              type: type as Types,
              error_type: errorType,
              is_array: isArray,
              is_object: isObject,
            })

            throw new Exception(
              {
                phrase: errorMessage,
                locale,
                replace: {
                  value: label,
                  limit: context['limit'],
                },
              },
              ExceptionCode.VALIDATE_FAILED,
            )
          }

          throw new Exception(
            `Validation error: ${error.message}`,
            ExceptionCode.VALIDATE_FAILED,
          )
        }

        throw new Exception(
          `Validation error: ${error.message}`,
          ExceptionCode.VALIDATE_FAILED,
        )
      }

      return value
    }

    return {
      valid,
    }
  }

  return {
    validate,
    joiDateNumber,
  }
}

export { Joi }
