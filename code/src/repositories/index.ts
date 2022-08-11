import { ICradle } from '../container'
import { examplesRepository } from './examples.repository'

export const repositories = (iCradle: ICradle) => {
  return {
    examplesRepository: examplesRepository(iCradle),
  }
}
