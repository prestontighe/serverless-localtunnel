# Serverless Localtunnel
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![npm](https://img.shields.io/npm/v/serverless-localtunnel.svg)](https://www.npmjs.com/package/serverless-localtunnel)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

Runs a localtunnel in your Serverless build process

## Usage
serverless.yml config
```
plugins:
  # - serverless-webpack
  # - serverless-client-s3
  # - serverless-dynamodb-local
  - serverless-offline
  - serverless-localtunnel
```
You are required to run serverless-offline before serverless-localtunnel. You have to have serverless-offline enabled to run this plugin.

### Single Tunnel
```
custom:
  localtunnel:
    subdomain: mysubdomain
    port: 8080
```
### Multi tunnel
Ex: Frontend & backend
```
custom:
  localtunnel:
    - subdomain: mysubdomainbackend
      port: 8080
    - subdomain: mysubdomainfrontend
      port: 3000
```
## Contributing

Yes, thank you! Try to follow [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript).

## License

MIT
