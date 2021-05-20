const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
 
module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
        {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    plugins: [ 
        new HtmlWebpackPlugin({
            title: 'Hello Webpack bundled JavaScript Project',
            template: path.resolve(__dirname, './src/index.html'),
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
    },
};