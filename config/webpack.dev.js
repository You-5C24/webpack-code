const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry
  entry: "./src/main.js",
  // output
  output: {
    path: undefined,
    filename: "static/js/main.js",
  },
  // module
  module: {
    rules: [
      // loader 的配置
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [
              "style-loader", // 动态创建 style 标签，把 js 中 css 添加到 html 文件中，使其生效
              "css-loader", // 把 css 资源编译成 cjs 模块 放到 js 中
            ],
          },
          {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
          },
          {
            test: /\.s[ac]ss$/,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
          },
          {
            test: /\.styl$/,
            use: ["style-loader", "css-loader", "stylus-loader"],
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
            generator: {
              filename: "static/images/[hash:10][ext][query]",
            },
          },
          {
            test: /\.(ttf|woff2?|map4|map3|avi)$/,
            type: "asset/resource",
            generator: {
              filename: "static/media/[hash:10][ext][query]",
            },
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/, // 排除 node_modules 下的文件，其他文件都处理
            // include: path.resolve(__dirname, "../src"), // 只处理 src 下的文件，其他文件不处理
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  // plugins
  plugins: [
    // plugin 的配置
    new ESLintWebpackPlugin({
      // 检测哪些文件
      context: path.resolve(__dirname, "../src"),
      exclude: "/node_modules/", // 默认会设置
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  // 开发服务器
  devServer: {
    host: "localhost",
    port: "8090",
    open: true,
    hot: true, // 开启热更新功能， 默认为true
  },
  // mode
  mode: "development",
  devtool: "cheap-module-source-map",
};
