const path = require("path");

module.exports = {
    entry: "./src/client/js/main.js",
    mode: "development",
    output: {
        filename: "main.js",
        path: "./assets/js",
        path: path.resolve(__dirname, "assets", "js"),
    },
    module: {
        rules: [
            {
                // 모든 js file 에 대해 babel-loader 를 실행
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { targets: "defaults" }]],
                    },
                },
            },
        ],
    },
};