const localtunnel = require("localtunnel");
const _ = require("lodash");

class ServerlessLocaltunnel {
  constructor(serverless) {
    this.serverless = serverless;
    this.options = _.get(this.serverless, "service.custom.localtunnel");
    // Parse tunnel options
    if (Array.isArray(this.options)) {
      this.tunnelsOptions = this.options.map((opt) => ({
        port: _.get(opt, "port", 8080),
        subdomain: _.get(opt, "subdomain"),
        local_host: _.get(opt, "local_host", "localhost"),
      }));
    } else {
      this.tunnelsOptions = [
        {
          port: _.get(this.options, "port", 8080),
          subdomain: _.get(this.options, "subdomain"),
          local_host: _.get(this.options, "local_host", "localhost"),
        },
      ];
    }
    // Run tunnels after serverless-offline
    this.hooks = {
      "before:offline:start:init": this.runServer.bind(this),
    };
  }
  runTunnel(port, subdomain, local_host) {
    let tunnel;
    let serverRestarted = false;
    const errorHandler = (e) => {
      this.serverless.cli.log("Localtunnel error - restarting in 15 seconds");
      console.log(e);
      if (serverRestarted) return;
      serverRestarted = true;
      tunnel.close();
      setTimeout(this.runTunnel.bind(this, port, subdomain, local_host), 15000);
    };
    try {
      tunnel = localtunnel(port, { subdomain, local_host }, (err, tunnel) => {
        if (err) {
          this.serverless.cli.log(`Localtunnel.me error: ${err.message}`);
        } else {
          this.serverless.cli.log(`Localtunnel.me started: ${tunnel.url}`);
        }
      });
      tunnel.on("close", () => {
        this.serverless.cli.log("Localtunnel closed");
      });
      tunnel.on("error", errorHandler);
    } catch (e) {
      errorHandler(e);
    }
    return tunnel;
  }
  runServer() {
    this.serverless.cli.log("Localtunnel running server");
    return this.tunnelsOptions.map(({ port, subdomain, local_host }) => {
      return this.runTunnel(port, subdomain, local_host);
    });
  }
}

module.exports = ServerlessLocaltunnel;
