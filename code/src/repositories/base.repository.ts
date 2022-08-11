import {
  FindAttributeOptions,
  IncludeOptions,
  Order,
  WhereOptions,
} from 'sequelize'

interface IPaging {
  limit?: number
  offset?: number
}

export const baseRepository = <T>(model: any) => {
  const findOneByFilter = async ({
    filter,
    includes,
    attributes,
    sort,
    raw,
    nest,
    paranoid,
  }: {
    filter: WhereOptions<T>
    includes?: IncludeOptions[]
    attributes?: FindAttributeOptions
    sort?: Order
    raw?: boolean
    nest?: boolean
    paranoid?: boolean
  }): Promise<T> => {
    const data = await model.findOne({
      where: filter,
      include: includes ? includes : [],
      attributes,
      order: sort ? sort : [],
      raw,
      paranoid,
      nest,
    })

    return data
  }

  const createOne = async (create_data: Partial<T>) => {
    return await model.create(create_data)
  }

  const findAllByFilter = async ({
    filter,
    includes,
    attributes,
    paging,
    sort,
  }: {
    filter?: WhereOptions<T>
    includes?: IncludeOptions[]
    attributes?: FindAttributeOptions
    sort?: Order
    paging?: IPaging
  }): Promise<T[]> => {
    const datas = await model.findAll({
      where: filter,
      include: includes ? includes : [],
      attributes,
      order: sort ? sort : [],
      ...paging,
    })

    return datas
  }

  const destroyParanoidByFilter = async ({
    filter,
  }: {
    filter: WhereOptions<T>
  }) => {
    return await model.destroy({
      where: filter,
    })
  }

  const findAndCountAllByFilter = async ({
    filter,
    includes,
    sort,
    paging,
    attributes,
    raw,
    subQuery = false,
  }: {
    filter: WhereOptions<T>
    includes?: IncludeOptions[]
    sort?: Order
    paging?: IPaging
    attributes?: FindAttributeOptions
    raw?: boolean
    subQuery?: boolean
  }): Promise<{
    rows: any[]
    count: number
  }> => {
    const datas = await model.findAndCountAll({
      where: filter,
      include: includes ? includes : [],
      order: sort ? sort : [],
      ...paging,
      nest: true,
      distinct: true,
      attributes,
      raw,
      subQuery,
    })

    return datas
  }

  const updateByFilter = async ({
    filter,
    update_data,
    returning = false,
  }: {
    filter: WhereOptions<T>
    update_data: Partial<T>
    returning?: boolean
  }) => {
    return await model.update(update_data, {
      where: filter,
      returning,
    })
  }

  const bulkCreate = async ({
    bulk_data,
    update_condition,
  }: {
    bulk_data: any[]
    update_condition?: any
  }) => {
    return await model.bulkCreate(bulk_data, {
      updateOnDuplicate: update_condition,
    })
  }

  return {
    findOneByFilter,
    findAllByFilter,
    createOne,
    updateByFilter,
    destroyParanoidByFilter,
    findAndCountAllByFilter,
    bulkCreate,
  }
}
