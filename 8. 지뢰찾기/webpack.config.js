const { VueLoaderPlugin } = require('vue-loader'); // vue loader plugin 
const path = require('path'); // node에서 제공하는 절대경로 찾는 기능 

module.exports = {
    mode: 'development',
    devtool: 'eval',
    devServer: {
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        hot: true
    },
    resolve: {
        extensions: ['.js', '.vue'],
    },
    entry: {
        app: path.join(__dirname, 'main.js'),
    },
    module: {
        rules:[
            {
                test: /\.vue$/, // .vue로 끝나는 파일 정규 표현식
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ]
            }
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: 'app.js', // [name].js
        path: path.join(__dirname, 'dist'),
        // publicPath: '/dist',
    },
};