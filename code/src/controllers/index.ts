import { cmsControllers } from './v1/cms'
import { mobileControllers } from './v1/mobile'
import { webControllers } from './v1/web'
import { externalControllers } from './v1/external'

export const controllers = () => {
  return {
    v1: {
      cmsControllers: cmsControllers(),
      mobileControllers: mobileControllers(),
      webControllers: webControllers(),
      externalControllers: externalControllers(),
    },
  }
}
