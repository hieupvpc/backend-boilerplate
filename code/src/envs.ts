import Joi from 'joi'
import { validation } from './helpers/validation.helper'

export interface IEnv {
  NODE_ENV: string
  HOST: string
  PORT: number
  TIMEZONE: string

  /**
   * * Database
   */
  DB: string
  DB_HOST: string
  DB_PORT: number
  DB_NAME: string
  DB_USER: string
  DB_PASSWORD: string

  /**
   * * Redis and Cache
   */
  REDIS_HOST: string
  REDIS_PORT: number
  REDIS_PASSWORD: string

  /**
   * Bull
   */
  REDIS_BULL_HOST: string
  REDIS_BULL_PORT: number
  REDIS_BULL_PREFIX: string

  /**
   * * JWT & Encryption
   */
  ACCESS_TOKEN_EXPIRE_IN: string
  REFRESH_TOKEN_EXPIRE_IN: string
  ENCRYPTION_KEY: string

  /**
   * PATH FILE
   */
  PUBLIC_SAMPLE_PATH_FILE: string
}

export const envs = () => {
  const envs: IEnv = validation()
    .validate(process.env)
    .valid({
      NODE_ENV: Joi.string()
        .valid(...['local', 'development', 'production'])
        .required(),
      HOST: Joi.string().required(),
      PORT: Joi.number().required(),
      TIMEZONE: Joi.string().required(),

      /**
       * * Database
       */
      DB: Joi.string()
        .valid(...['postgres'])
        .required(),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_NAME: Joi.string().required(),
      DB_USER: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),

      /**
       * * Redis and Cache
       */
      REDIS_HOST: Joi.string().required(),
      REDIS_PORT: Joi.number().required(),
      REDIS_PASSWORD: Joi.string().required(),

      /**
       * Bull
       */
      REDIS_BULL_HOST: Joi.string().required(),
      REDIS_BULL_PORT: Joi.number().required(),
      REDIS_BULL_PREFIX: Joi.string().required(),

      /**
       * JWT & Encryption
       */
      ACCESS_TOKEN_EXPIRE_IN: Joi.string().required(),
      REFRESH_TOKEN_EXPIRE_IN: Joi.string().required(),
      ENCRYPTION_KEY: Joi.string().required(),

      /**
       * PATH FILE
       */
      PUBLIC_SAMPLE_PATH_FILE: Joi.string().required(),
    })

  return envs
}
