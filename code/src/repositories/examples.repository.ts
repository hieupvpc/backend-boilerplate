import { ICradle } from '../container'
import { exampleAttributes } from '../models/examples.model'
import { baseRepository } from './base.repository'

export const examplesRepository = (iCradle: ICradle) => {
  const { examples } = iCradle.sequelizeModel.models

  return baseRepository<exampleAttributes>(examples)
}
