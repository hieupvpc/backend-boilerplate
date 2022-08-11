import { ICradle } from '../container'
import Redis from 'ioredis'

export const queueHelper = (iCradle: ICradle) => {
  const { REDIS_BULL_HOST, REDIS_BULL_PORT } = iCradle.envs

  const MAX_LISTENER = 10

  const client = new Redis({
    host: REDIS_BULL_HOST,
    port: REDIS_BULL_PORT,
    enableReadyCheck: false,
    enableOfflineQueue: true,
    maxRetriesPerRequest: null,
    connectTimeout: 50000,
  })

  const subscriber = new Redis({
    host: REDIS_BULL_HOST,
    port: REDIS_BULL_PORT,
    enableReadyCheck: false,
    enableOfflineQueue: true,
    maxRetriesPerRequest: null,
    connectTimeout: 50000,
  })

  client.setMaxListeners(MAX_LISTENER)
  subscriber.setMaxListeners(MAX_LISTENER)

  client.on('error', (err) => {
    console.log(`Redis client error, ${String(err)}`)
  })

  subscriber.on('error', (err) => {
    console.log(`Redis subscriber error, ${String(err)}`)
  })

  const getRedisOpts = () => {
    return {
      createClient: (type: 'client' | 'subscriber' | 'bclient') => {
        switch (type) {
          case 'client':
            return client
          case 'subscriber':
            return subscriber
          default:
            return new Redis({
              host: REDIS_BULL_HOST,
              port: REDIS_BULL_PORT,
              enableReadyCheck: false,
              enableOfflineQueue: true,
              maxRetriesPerRequest: null,
            })
        }
      },
    }
  }

  return {
    getRedisOpts,
  }
}
