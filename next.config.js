const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')
const withTypescript = require('@zeit/next-typescript');
module.exports = withTypescript({
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    return config
  },
});

console.log(module.exports)
