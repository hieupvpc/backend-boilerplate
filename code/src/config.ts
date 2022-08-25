import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import { ICradle } from './container'
import cors from 'cors'
import pg from 'pg'
import { Sequelize, Dialect } from 'sequelize'
import compression from 'compression'
import helmet from 'helmet'
import moment from 'moment-timezone'
import i18n from 'i18n'
import { models } from './models'
import { sockets } from './sockets'

const initI18n = () => {
  i18n.configure({
    locales: ['VI', 'EN'],
    directory: path.join(__dirname, '..', 'locales'),
  })
}

export const initEnv = () => {
  const pathEnv = path.join(__dirname, '..', '.env')

  dotenv.config({ path: pathEnv })
}

const initTimeZone = ({ envs }: ICradle) => {
  const TIMEZONE = envs.TIMEZONE
  /**
   * * Init moment timezone
   */
  moment.tz.setDefault(TIMEZONE)
}

export const initSequelizeModel = (iCradle: ICradle) => {
  const { envs } = iCradle
  const sequelize = new Sequelize(
    envs.DB_NAME,
    envs.DB_USER,
    envs.DB_PASSWORD,
    {
      host: envs.DB_HOST,
      dialectModule: pg,
      dialect: envs.DB as Dialect,
      dialectOptions: {
        useUTC: false,
        dateStrings: true,
      },
      logging: false,
      port: envs.DB_PORT,
      pool: {
        max: 10,
        min: 1,
        idle: 20000,
        acquire: 50000,
        evict: 1000,
      },
      timezone: envs.TIMEZONE,
      minifyAliases: true,
    },
  )

  return {
    sequelize,
    models: models(sequelize),
  }
}

export const setup = async (iCradle: ICradle) => {
  initEnv()
  initI18n()
  initTimeZone(iCradle)
  initSequelizeModel(iCradle).sequelize.sync()

  console.log(`🚀🚀🚀 PostgreSQL connected successfully 🚀🚀🚀`)
}

export const startServer = async ({ envs, routers, middlewares }: ICradle) => {
  const HOST = envs.HOST
  const PORT = envs.PORT
  const ENV = envs.NODE_ENV
  const app = express()

  const server = http.createServer(app)

  app.use(cors())
  app.enable('trust proxy')
  app.use(express.json())
  app.use(express.urlencoded({ extended: true, limit: '10mb' }))
  app.use(compression())
  app.use(helmet())

  app.use(
    envs.PUBLIC_SAMPLE_PATH_FILE,
    express.static(path.join(__dirname, '..', 'public')),
  )

  app.use(routers)

  app.use(middlewares.catchErrorMiddlware.catchError)

  server.listen(PORT, HOST, () => {
    console.log(
      `--- Server is running at http://${HOST}:${PORT} in ${ENV} mode ---`,
    )
  })

  sockets(server)
}

export const startJobs = async ({ jobs, queues }: ICradle) => {
  jobs.executeJobs()

  await queues.exampleQueue.add(null, {
    repeat: { cron: '55 * * * *' },
    removeOnComplete: true,
    removeOnFail: true,
  })
}
