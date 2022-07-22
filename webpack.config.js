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
    ],
  },
  // plugins
  plugins: [
    // plugin 的配置
  ],
  // mode
  mode: "development",
};
