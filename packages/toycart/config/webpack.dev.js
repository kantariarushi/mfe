const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8085/'
    },
    devServer: {
        port: 8085,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'toycart',
            filename: 'remoteEntry.js',
            exposes: {
                './ToycartApp': './src/bootstrap'
            },
            shared: packageJson.dependencies,
            remotes: {
                marketing: 'maketing@http://localhost:8081/remoteEntry.js'
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig);