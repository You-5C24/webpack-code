const os = require("os");
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const threads = os.cpus().length;

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  // entry
  entry: "./src/main.js",
  // output
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/main.js",
    // assetModuleFilename: "images/[hash][ext][query]",
    // 自动清空上次打包结果
    clean: true,
  },
  // module
  module: {
    rules: [
      {
        oneOf: [
          // loader 的配置
          {
            test: /\.css$/,
            use: getStyleLoaders(),
          },
          {
            test: /\.less$/,
            use: getStyleLoaders("less-loader"),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders("sass-loader"),
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders("stylus-loader"),
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
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: "true", // 开启 babel 编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              },
            ],
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
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 提取 css 成单独文件
    new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
    // css压缩
    // new CssMinimizerPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads, // 开启多进程
      }),
    ],
  },
  // 开发服务器
  devServer: {
    host: "localhost",
    port: "8090",
    open: true,
  },
  // mode
  mode: "production",
  devtool: "source-map",
};
