import { ICradle } from '../container'

export const jobs = (iCradle: ICradle) => {
  const { queues, processors } = iCradle

  const { exampleQueue } = queues

  const { exampleProcessor } = processors

  const executeJobs = () => {
    try {
      console.log(`=== START JOBS ===`)

      exampleQueue.process(1, exampleProcessor)
    } catch (e) {
      console.log(e, 'error_start_job')
    }
  }
  return {
    executeJobs,
  }
}
