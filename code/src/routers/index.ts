import express from 'express'
import { routerV1 } from './v1'

export const routers = () => {
  const routers = express.Router()

  routers.use('/v1', routerV1())

  return routers
}
