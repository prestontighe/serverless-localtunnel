const ServerlessLocaltunnel = require('./index')
const testHost = 'https://localtunnel.me'
const testSubdomain = 'randomsubdomain1239873'
const testPort = 2000

let serverless
beforeEach(() => {
  serverless = {
    cli: {
      log: jest.fn(string => console.log(string))
    }
  }
})
test('Flat single localtunnel', () => {
  serverless.service = {
    custom: {
      localtunnel: {
        port: testPort,
        subdomain: testSubdomain
      }
    }
  }
  const serverlessLocaltunnel = new ServerlessLocaltunnel(serverless)
  const tunnels = serverlessLocaltunnel.runServer()
  const tunnel = tunnels[0]
  expect(tunnels).toHaveLength(1);
  expect(serverless.cli.log.mock.calls.length).toBe(1);
  expect(tunnel._closed).toBe(false);
  expect(tunnel._opt.port).toBe(testPort);
  expect(tunnel._opt.subdomain).toBe(testSubdomain);
  expect(tunnel._opt.host).toBe(testHost);
  tunnel.close()
  expect(serverless.cli.log.mock.calls.length).toBe(2);
  expect(tunnel._closed).toBe(true);
});
test('Multi tunnel setup', () => {
  serverless.service = {
    custom: {
      localtunnel: [{
        port: 2001,
        subdomain: '078v25vc2502039v8y0'
      },{
        port: 2002,
        subdomain: '4369749sfldkgoiwgwno'
      },{
        port: 2003,
        subdomain: 'v57w9v5nw97e5v9w7n59'
      }]
    }
  }
  const serverlessLocaltunnel = new ServerlessLocaltunnel(serverless)
  const tunnels = serverlessLocaltunnel.runServer()
  expect(tunnels).toHaveLength(3);
  tunnels.forEach(tunnel => {
    tunnel.close()
  })
});