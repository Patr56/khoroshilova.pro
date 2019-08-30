const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
   mode: 'production',
   devtool: 'source-map',
   
   plugins: [
    new CopyWebpackPlugin([
        { from: 'pages/prod'},
        { from: 'node_modules/react/umd/react.production.min.js', to: 'js/react.production.min.js' },
        { from: 'node_modules/react-dom/umd/react-dom.production.min.js', to: 'js/react-dom.production.min.js' }
    ])
],
});