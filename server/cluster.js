require('newrelic');
let os = require('os')
let fs = require('fs')
let cluster = require('cluster')
let Worker = require('./cluster-worker')
let type = 'cluster'

class Cluster {
    constructor () {
      if (cluster.isMaster) {
        this.fork()
      }
      else {
        new Worker()
      }
    }
  
    fork () {
      let cpus = os.cpus().length
  
      for (let i = 0; i < cpus; i++) {
        cluster.fork({id: i})
      }
    }
  }
  
  new Cluster()