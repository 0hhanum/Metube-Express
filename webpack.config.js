const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS = "./src/client/js/"

module.exports = {
    entry: {
        main: BASE_JS + "main.js",
        videoPlayer: BASE_JS + "videoPlayer.js",
        recorder: BASE_JS + "recorder.js",
        commentSection: BASE_JS + "commentSection.js",
    },
    // watch: true,
    // nodemon 과 같이 npm run assets 가 종료되지 않음.
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/styles.css",
        }),
        // client main.js 에서 css 를 분리해줌.
    ],
    output: {
        filename: "js/[name].js",
        // entry 별로 js 파일을 생성.
        path: path.resolve(__dirname, "assets"),
        clean: true,
        // output folder 를 한번 지우고 다시 생성. (clean)  
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
            {
                test: /\.scss/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
                // 역순으로 loader 사용. sass->css, css 변환, css 적용
            }
        ],
    },
};
