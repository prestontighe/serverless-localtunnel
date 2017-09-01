const localtunnel = require('localtunnel')
const _ = require('lodash')

class ServerlessLocaltunnel {
  constructor (serverless, options) {
    this.serverless = serverless
    this.options = options
    this.hooks = {
      'before:offline:start:init': this.runServer.bind(this)
    }
  }
  runServer() {
    console.log('runServer')
    this.serverless.cli.log('runServer')
    console.log('runServer 2')
    let serverRestarted = false
    try {
      const tunnel = localtunnel(_.get(this.serverless, 'service.custom.localtunnel.port', 8080), {subdomain: _.get(this.serverless, 'service.custom.localtunnel.subdomain')}, (err, tunnel) => {
        if (err) {
          this.serverless.cli.log('Localtunnel error')
        }else{
          this.serverless.cli.log(`Localtunnel.me started: ${tunnel.url}`)
        }
      })
      tunnel.on('close', () => {
        console.log('runServer close')
        this.serverless.cli.log('Localtunnel closed')
      })
      tunnel.on('error', e => {
        console.log('runServer error')
        this.serverless.cli.log('Localtunnel error')
        if(serverRestarted) return
        serverRestarted = true
        setTimeout(this.runServer.bind(this), 2000)
      })
    } catch (e) {
      if(serverRestarted) return
      serverRestarted = true
      setTimeout(this.runServer.bind(this), 2000)
    }
  }
}

module.exports = ServerlessLocaltunnel;