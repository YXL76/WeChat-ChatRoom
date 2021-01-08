const CopyWebpackPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");
const MpxWebpackPlugin = require("@mpxjs/webpack-plugin");
const path = require("path");
const rm = require("rimraf");

const mode = "wx";
const srcMode = "wx";

function resolveRoot() {
  return path.resolve(__dirname, ...arguments);
}

function resolveSrc() {
  return path.resolve(__dirname, "src", ...arguments);
}

function resolveDist() {
  return path.resolve(__dirname, "dist", mode, ...arguments);
}

try {
  rm.sync(resolveDist("*"));
} catch (e) {
  console.error(e);
  console.log(
    "\n\n删除dist文件夹遇到了一些问题，如果遇到问题请手工删除dist重来\n\n",
  );
}

/**@type {import('webpack').Configuration}*/
module.exports = (_, options) => ({
  stats: {
    assets: false,
    children: false,
    chunkModules: false,
    chunks: false,
    colors: true,
    entrypoints: false,
    modules: false,
  },
  mode: "none",
  performance: {
    hints: false,
  },
  entry: {
    app: resolveSrc("app.mpx"),
  },
  output: {
    // 和 webpack 配置一致,编译后文件输出的路径
    path: resolveDist(),
    // 必须设置为"/"
    publicPath: "/",
    // 必须设置为"[name].js"
    filename: "[name].js",
  },
  node: {
    // 在 Node 环境中 global 标识全局对象，Mpx 中需要依赖 global 进行运行时注入
    global: true,
  },
  module: {
    rules: [
      {
        test: /\.mpx$/,
        // 以 .mpx 结尾的文件需要使用 Mpx 提供的 loader 进行解析，处理 .mpx 文件包含的template，script, style, json等各个部分
        use: MpxWebpackPlugin.loader({
          // 自定义 loaders
          // loaders: {
          //   scss: [
          //     { loader: "css-loader" },
          //     {
          //       loader: "sass-loader",
          //       options: { sassOptions: { outputStyle: "nested" } },
          //     },
          //   ],
          // },
        }),
      },
      {
        test: /\.js$/,
        // js 文件走正常的 babel 解析
        use: {
          loader: "babel-loader",
          options: {
            configFile: resolveRoot("babel.config.json"),
          },
        },
        // include 和 exclude 定义哪些 .js 文件走 babel 编译，哪些不走 babel 编译，配置include、exclude 可以提高查找效率
        include: [resolveSrc(), resolveRoot("node_modules", "@mpxjs")],
        exclude: [
          resolveRoot("node_modules", "**", "src", "third_party", "**"),
        ],
      },
      {
        // 适用于<script type="application/json" src="../common.json">，Mpx内部会添加上__component，设置 type 以防止走 webpack 内建的 json 解析
        // webpack json解析，抽取内容的占位内容必须为合法 json，否则会在 parse 阶段报错
        test: /\.json$/,
        resourceQuery: /__component/,
        type: "javascript/auto",
      },
      {
        // 各小程序平台自有脚本的差异抹平
        test: /\.(wxs|qs|sjs|filter\.js)$/,
        loader: MpxWebpackPlugin.wxsPreLoader(),
        enforce: "pre",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        // Mpx 提供图像资源处理，支持 CDN 和 Base64 两种
        loader: MpxWebpackPlugin.urlLoader({
          name: "img/[name][hash].[ext]",
        }),
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              configFile: resolveRoot("babel.config.json"),
            },
          },
          {
            loader: "ts-loader",
            options: {
              configFile: resolveRoot("tsconfig.json"),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // 当通过 require, import 引入不带后缀的文件时，webpack 将自动带上后缀后去尝试访问文件是否存在
    extensions: [".mpx", ".js", ".wxml", ".vue", ".ts"],
    modules: ["node_modules"],
  },
  plugins: [
    new MpxWebpackPlugin({
      mode, // 可选值 wx/ali/swan/qq/tt/web
      srcMode, // 暂时只支持微信为源mode做跨平台，为其他时mode必须和srcMode一致
      resolveMode: "webpack", // 可选值 webpack / native，默认是webpack，原生迁移建议使用native
      // projectRoot: resolve('src'), // 当resolveMode为native时可通过该字段指定项目根目录
      writeMode: "changed", // 可选值 full / changed，不传默认为change，当设置为changed时在watch模式下将只会对内容发生变化的文件进行写入，以提升小程序开发者工具编译性能
      defs: {}, // 定义一些全局环境变量，可在JS/模板/样式/JSON中使用
      // 是否转换px到rpx
      transRpxRules: [
        {
          mode: "only",
          comment: "use rpx",
          include: resolveSrc(),
        },
      ],
      // i18n: {}, // 多语言i18n能力
      generateBuildMap: false, // 是否生成用于测试的源文件/dist的映射表
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          context: resolveRoot("static", mode),
          from: "**/*",
          to: resolveDist(),
        },
      ],
    }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  optimization: {
    nodeEnv: options.mode === "production" ? "production" : "development",
    minimizer: [
      {
        apply: (compiler) => {
          // Lazy load the Terser plugin
          const TerserPlugin = require("terser-webpack-plugin");
          const SourceMapDevToolPlugin = require("webpack/lib/SourceMapDevToolPlugin");
          const options = compiler.options;
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap:
              (options.devtool && /source-?map/.test(options.devtool)) ||
              (options.plugins &&
                options.plugins.some(
                  (p) => p instanceof SourceMapDevToolPlugin,
                )),
            // terserOptions参考 https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            terserOptions: {
              // terser的默认行为会把某些对象方法转为箭头函数，导致ios9等不支持箭头函数的环境不支持，详情见 https://github.com/terser/terser#compress-options
              compress: {
                arrows: false,
              },
            },
          }).apply(compiler);
        },
      },
    ],
  },
});
