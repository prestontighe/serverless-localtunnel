const localtunnel = require('localtunnel')
const _ = require('lodash.get')

class LocalTunnel {
  constructor (serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.hooks = {
      'before:offline:start:init': this.runServer.bind(this),
    }
  }

  runServer () {
    let serverRestarted = false
    try{
      const tunnel = localtunnel(_.get(this.serverless, 'custom.localtunnel.port', 8080), {subdomain: _.get(this.serverless, 'custom.localtunnel.subdomain')}, (err, tunnel) => {
        if (err) {
          console.log(err)
        }else{
          console.log(`Localtunnel.me started: ${tunnel.url}`)
        }
      })
      tunnel.on('close', () => {
        console.log('Localtunnel closed')
      })
      tunnel.on('error', () => {
        if(serverRestarted) return
        serverRestarted = true
        setTimeout(this.runServer, 2000)
      })
    } catch (e) {
      if(serverRestarted) return
      serverRestarted = true
      setTimeout(this.runServer, 2000)
    }
  }
}

module.exports = LocalTunnel;