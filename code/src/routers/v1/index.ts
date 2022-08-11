import express from 'express'
import { cmsRouter } from './cms'
import { externalRouter } from './external'
import { mobileRouter } from './mobile'
import { webRouter } from './web'

export const routerV1 = () => {
  const routers = express.Router()

  routers.use('/cms', cmsRouter())

  routers.use('/mobile', mobileRouter())

  routers.use('/web', webRouter())

  routers.use('/external', externalRouter())

  return routers
}
