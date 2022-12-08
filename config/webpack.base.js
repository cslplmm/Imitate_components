const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.(t|j)s$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                type: 'asset',
                generator: {
                    filename: 'images/[name]-[hash][ext]',
                },
            },
            {
                test: /\.(eot|svg|ttf|woff2?|)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name]-[hash][ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack5-ts-vue',
            template: './index.html',
        }),
        new VueLoaderPlugin(),
    ],
    // extensions 配置项的功能是解析到文件时自动添加扩展名，其默认值为 ['.wasm', '.mjs', '.js', '.json'] ，我们可以根据需求将 .vue 也加入其中，虽然会带来一些便利，但实际上会在一定程度上影响 webpack 的运行效率，不推荐修改
    /* resolve: {
        extensions: ['.vue'],
    }, */
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
    },
    cache: {
        type: 'filesystem',
    },
};
