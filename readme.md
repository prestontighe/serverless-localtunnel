# Serverless Localtunnel
Runs a localtunnel in your Serverless build process

## Usage
serverless.yml config
```
plugins:
  # - serverless-webpack
  # - serverless-client-s3
  # - serverless-dynamodb-local
  - serverless-offline
  - local-tunnel
```
You are required to run serverless-offline before local-tunnel. You have to have serverless-offline enabled to run this plugin.
```
custom:
  localtunnel:
    subdomain: my-custom-subdomain
```
## Contributing

Yes, thank you! Try to follow [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript).

## License

MIT
