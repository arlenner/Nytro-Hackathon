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
        publicPath: '/',
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
    },
    plugins: [ 
        new HtmlWebpackPlugin({
            title: 'Nytro Cards',
            template: path.resolve(__dirname, './src/index.html'),
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        historyApiFallback: true
    },
};