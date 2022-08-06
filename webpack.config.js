const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // 入口
    entry: './src/index.js',

    // 出口
    output: {
        // 虚拟打包路径，文件夹不会真正生成，而是在8080端口虚拟生成
        path: path.join(__dirname, 'dist'),

        //  打包出来的文件名称，不会真正的物理生成
       filename: 'bundle.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html'
        })
    ],

    devServer: {
        // 端口号
        port: 8081,
        compress: false,
        open: false
    }
};
