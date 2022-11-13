const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    devtool: 'eval-cheap-module-source-map',
    resolve: {
        modules: ['node_modules']
    }
};
