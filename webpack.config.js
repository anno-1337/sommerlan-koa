module.exports = {
    entry: ["./src/client/index.ts"],
    mode: "development",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        publicPath: "/public"
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: "ts-loader"
            }
        ]
    }
}