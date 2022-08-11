import { ICradle } from '../container'
import { catchErrorMiddlware } from './catchError.middleware'

export const middlewares = (iCradle: ICradle) => {
  return {
    catchErrorMiddlware: catchErrorMiddlware(iCradle),
  }
}
