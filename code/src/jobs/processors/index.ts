import { ICradle } from '../../container'
import { exampleProcessor } from './example.processor'

export const processors = (iCradle: ICradle) => {
  return {
    exampleProcessor: exampleProcessor(iCradle),
  }
}
