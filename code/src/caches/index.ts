import Redis from 'ioredis'
import { ICradle } from '../container'
import _ from 'lodash'

export const caches = ({ envs }: ICradle) => {
  const cacheServer = new Redis({
    host: envs.REDIS_HOST,
    port: envs.REDIS_PORT,
  })

  const EXPIRE_TIME_REDIS = 86400

  const getCache = async (key: string) => {
    const cacheData = await cacheServer.get(key)

    if (!cacheData) {
      return null
    }

    return JSON.parse(cacheData)
  }

  const setCache = async (
    key: string,
    value: any,
    ttl: number = EXPIRE_TIME_REDIS,
  ) => {
    await cacheServer.set(key, JSON.stringify(value), 'EX', ttl)
  }

  const delCache = async (key: string) => {
    await cacheServer.del(key)
  }

  const delCacheByPattern = async (pattern: string) => {
    const keys = await cacheServer.keys(pattern)
    await cacheServer.del(keys)
  }

  return {
    getCache,
    setCache,
    delCache,
    delCacheByPattern,
  }
}
