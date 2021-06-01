const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
 
module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader', 
                ]
            },
            {
                test: /\.png$/,
                exclude: /node_modules/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js'],
        
    },
    node: {
        global: true
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
        }),
        new NodePolyfillPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        historyApiFallback: true
    },
};