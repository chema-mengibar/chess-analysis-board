const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devtool: 'source-map',
    optimization: {
        usedExports: true
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(scss|css)$/,
            use: [
                process.env.NODE_ENV !== 'production' ?
                'style-loader' :
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ]
};