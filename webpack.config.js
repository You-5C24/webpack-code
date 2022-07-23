const path = require("path");

module.exports = {
  // entry
  entry: "./src/main.js",
  // output
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  // module
  module: {
    rules: [
      // loader 的配置
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
    ],
  },
  // plugins
  plugins: [
    // plugin 的配置
  ],
  // mode
  mode: "development",
};
