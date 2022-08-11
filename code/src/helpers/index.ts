import { ICradle } from '../container'
import { validation } from './validation.helper'
import { responseHelper } from './response.helper'
import { otherHelper } from './other.helper'
import { queueHelper } from './queue.helper'

export const helpers = (iCradle: ICradle) => {
  return {
    validation: validation(),
    responseHelper: responseHelper(),
    otherHelper: otherHelper(),
    queueHelper: queueHelper(iCradle),
  }
}
