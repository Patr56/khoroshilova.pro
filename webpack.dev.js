const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true, // enable gzip compression
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        inline: true,
        https: false, // true for self-signed, object for cert authority
        port: 9000
    },
    
    plugins: [
        new CopyWebpackPlugin([
            { from: 'pages/dev'},
            { from: 'node_modules/react/umd/react.development.js', to: 'js/react.development.js' },
            { from: 'node_modules/react-dom/umd/react-dom.development.js', to: 'js/react-dom.development.js' }
        ])
    ],
});