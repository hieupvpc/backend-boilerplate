import { ICradle } from '../../container'
import Queue from 'bull'
import Joi from 'joi'
import { JOB_ID_PREFIX } from '../constants'
import { queueHelper } from '../../helpers/queue.helper'
import { validation } from '../../helpers/validation.helper'

export const queues = (iCradle: ICradle) => {
  const queueHelperUsage = queueHelper(iCradle)
  const validationHelper = validation()

  const { REDIS_BULL_PREFIX } = validationHelper.validate(process.env).valid({
    REDIS_BULL_PREFIX: Joi.string().required(),
  })

  const redisOpts = queueHelperUsage.getRedisOpts()

  const exampleQueue = new Queue(
    `${REDIS_BULL_PREFIX}_${JOB_ID_PREFIX.JOB_EXAMPLE}`,
    redisOpts,
  )

  return {
    exampleQueue,
  }
}
