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
    this.serverless.cli.log('Localtunnel running server')
    let serverRestarted = false
    const errorHandler = e => {
      this.serverless.cli.log('Localtunnel error - restarting in 5 seconds')
      console.log(e)
      if(serverRestarted) return
      serverRestarted = true
      setTimeout(this.runServer.bind(this), 5000)
    }
    try {
      const tunnel = localtunnel(_.get(this.serverless, 'service.custom.localtunnel.port', 8080), {subdomain: _.get(this.serverless, 'service.custom.localtunnel.subdomain')}, (err, tunnel) => {
        if (err) {
          this.serverless.cli.log('Localtunnel error')
        }else{
          this.serverless.cli.log(`Localtunnel.me started: ${tunnel.url}`)
        }
      })
      tunnel.on('close', () => {
        this.serverless.cli.log('Localtunnel closed')
      })
      tunnel.on('error', errorHandler)
    } catch (e) {
      errorHandler(e)
    }
  }
}

module.exports = ServerlessLocaltunnel;