const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: 'index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,  // 检测哪些文件
                exclude: /(node_module)/,   // 忽略哪些文件
                loader: "babel-loader" // 使用babel-loader处理es6代码
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ] // 后面的loader先执行
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'), // 根目录
        open: true, // 浏览器自动打开
        port: 8001 // 端口
    }
}