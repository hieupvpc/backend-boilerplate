import * as awilix from 'awilix'
import { caches } from './caches'
import { initSequelizeModel, setup, startJobs, startServer } from './config'
import { controllers } from './controllers'
import { envs } from './envs'
import { helpers } from './helpers'
import { jobs } from './jobs'
import { processors } from './jobs/processors'
import { queues } from './jobs/queues'
import { middlewares } from './middlewares'
import { repositories } from './repositories'
import { routers } from './routers'
import { usecases } from './usecases'

export interface ICradle {
  envs: ReturnType<typeof envs>
  sequelizeModel: ReturnType<typeof initSequelizeModel>
  setup: ReturnType<typeof setup>
  startServer: ReturnType<typeof startServer>
  helpers: ReturnType<typeof helpers>
  jobs: ReturnType<typeof jobs>
  queues: ReturnType<typeof queues>
  processors: ReturnType<typeof processors>
  startJobs: ReturnType<typeof startJobs>
  controllers: ReturnType<typeof controllers>
  routers: ReturnType<typeof routers>
  caches: ReturnType<typeof caches>
  usecases: ReturnType<typeof usecases>
  middlewares: ReturnType<typeof middlewares>
  repositories: ReturnType<typeof repositories>
}

export const initContainer = () => {
  const container = awilix.createContainer()

  container.register({
    envs: awilix.asFunction(envs).singleton(),
    sequelizeModel: awilix.asFunction(initSequelizeModel).singleton(),
    setup: awilix.asFunction(setup).singleton(),
    startServer: awilix.asFunction(startServer).singleton(),
    helpers: awilix.asFunction(helpers).singleton(),
    jobs: awilix.asFunction(jobs).singleton(),
    queues: awilix.asFunction(queues).singleton(),
    processors: awilix.asFunction(processors).singleton(),
    startJobs: awilix.asFunction(startJobs).singleton(),
    controllers: awilix.asFunction(controllers).singleton(),
    routers: awilix.asFunction(routers).singleton(),
    caches: awilix.asFunction(caches).singleton(),
    usecases: awilix.asFunction(usecases).singleton(),
    middlewares: awilix.asFunction(middlewares).singleton(),
    repositories: awilix.asFunction(repositories).singleton(),
  })

  return container
}
