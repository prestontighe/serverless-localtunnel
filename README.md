# Serverless Localtunnel
[![npm](https://img.shields.io/npm/v/npm.svg)]()
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
```
custom:
  localtunnel:
    subdomain: my-custom-subdomain
    port: 8080
```
## Contributing

Yes, thank you! Try to follow [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript).

## License

MIT
