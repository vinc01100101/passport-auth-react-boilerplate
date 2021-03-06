const path = require("path");
const nodeEnv = process.env.NODE_ENV.trim();
console.log(nodeEnv);
module.exports = {
    mode: nodeEnv,
    entry: {
        Home: ["./src_client/Home.js"],
        Register: ["./src_client/Register.js"],
        Profile: ["./src_client/Profile.js"],
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        publicPath: "/js/",
        filename: `[name].js`,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [],
    optimization: {
        runtimeChunk: "single",
        minimize: nodeEnv == "production",
    },
};
