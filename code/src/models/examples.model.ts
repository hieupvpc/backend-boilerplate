import { Optional, Model, Sequelize, DataTypes } from 'sequelize'

export interface exampleAttributes {
  id: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export type examplePk = 'id'
export type exampleCreationAttributes = Optional<exampleAttributes, examplePk>

export class examples
  extends Model<exampleAttributes, exampleCreationAttributes>
  implements exampleAttributes
{
  id!: string
  created_at: Date
  updated_at: Date
  deleted_at: Date

  static TABLE_NAME = 'examples'

  static initModel(sequelize: Sequelize): typeof examples {
    examples.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
      },
      {
        sequelize,
        tableName: examples.TABLE_NAME,
        schema: 'public',
        hasTrigger: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
      },
    )

    return examples
  }

  static associate() {
    this.hasMany(examples, {
      as: examples.TABLE_NAME,
      foreignKey: 'example_id',
    })
  }
}
