import { Sequelize } from 'sequelize'
import { examples } from './examples.model'

export const models = (sequelize: Sequelize) => {
  examples.initModel(sequelize)

  /**
   * Association
   */
  examples.associate()

  return {
    examples,
  }
}
