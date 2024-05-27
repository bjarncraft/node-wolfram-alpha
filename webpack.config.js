const { join, resolve } = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const NpmDtsPlugin = require('npm-dts-webpack-plugin')

const tsconfig = require('./tsconfig');

const path = {
  config: __dirname,
  source: join(__dirname, '/src'),
  target: join(__dirname, '/dist'),
  test: join(__dirname, '/tests'),
};

module.exports = {
  entry: {
    main: resolve(path.source, 'index.ts')
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      rules: [{
        use: [{
          loader: 'tslint-loader',
          options: {
            configFile: resolve(path.config, 'tslint.json'),
            typeCheck: false,
          }
        }]
      }, {
        use: [{
          loader: 'ts-loader',
        }]
      }]
    }]
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    filename: '[name]-bundle.js',
    hashDigest: 'base64',
    hashFunction: 'sha256',
    path: path.target,
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      generateStatsFile: true,
      openAnalyzer: false,
      reportFilename: 'bundles.html',
    }),
    new NpmDtsPlugin({ 
      name: 'index',
      project: path.config,
      out: path.target,
      force: true
    })
  ],
  target: 'node'
}