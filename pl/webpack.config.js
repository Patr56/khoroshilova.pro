var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "js/bundle.js",
        publicPath: "/",
        path: path.join(__dirname, 'build')
    },
    mode: "development",
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true, // enable gzip compression
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        inline: true,
        https: false, // true for self-signed, object for cert authority
        port: 9000
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash]-[name].[ext]',
                    outputPath: 'images/'
                }
            }

        ]
    },

    plugins: [
        new CleanWebpackPlugin("build"),
        new CopyWebpackPlugin([
            { from: 'static/index.html', to: 'index.html' },
            { from: 'node_modules/react/umd/react.development.js', to: 'js/react.development.js' },
            { from: 'node_modules/react-dom/umd/react-dom.development.js', to: 'js/react-dom.development.js' }
        ]),
        new ExtractTextPlugin('css/main.css')
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};