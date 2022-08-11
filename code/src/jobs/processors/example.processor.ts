import { ICradle } from '../../container'

export const exampleProcessor = (iCradle: ICradle) => {
  return async (job: any) => {
    console.log(iCradle.envs.DB, job.data)
  }
}
