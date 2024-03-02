import os from 'os'
import cluster from 'cluster'
import serverStart from './start.js'

// ===== START CLUSTERS =====//
const clusterStart = app => {
  const mainNumCpus = os.cpus().length

  // If cpu count is less than 2, do not use cluster
  if (mainNumCpus < 2) {
    const server = serverStart(app)
  } else {
    if (cluster.isMaster) {
      const numCpus = os.cpus().length
      console.log(`The total number of CPUs is ${numCpus}`)
      console.log(`Master started. Pid: ${process.pid}`)

      // Create cluster workers
      for (let i = 0; i < numCpus - 1; i++) {
        cluster.fork()
      }

      cluster.on('exit', worker => {
        console.log(`Cluster worker with pid=${worker.process.pid} died`)
        console.log(`Starting another worker`)
        cluster.fork()
      })

    }
    if (cluster.isWorker) {
      const server = serverStart(app)
    }
  }
}

export default clusterStart
