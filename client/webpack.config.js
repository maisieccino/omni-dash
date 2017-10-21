// For inspiration on your webpack configuration, see:
// https://github.com/shakacode/react_on_rails/tree/master/spec/dummy/client
// https://github.com/shakacode/react-webpack-rails-tutorial/tree/master/client

const webpack = require("webpack");
const { resolve } = require("path");

const ManifestPlugin = require("webpack-manifest-plugin");
const webpackConfigLoader = require("react-on-rails/webpackConfigLoader");

const configPath = resolve(__dirname, "..", "config");
const { output, settings } = webpackConfigLoader(configPath);
const devBuild = process.env.NODE_ENV !== "production";
const hmr = settings.dev_server ? settings.dev_server.hmr : false;

const config = {
  context: resolve(__dirname),

  entry: {
    "webpack-bundle": [
      "es5-shim/es5-shim",
      "es5-shim/es5-sham",
      "babel-polyfill",
      "./app/bundles/HackerView/startup/registration",
      "./app/bundles/AdminView/startup/registration",
    ],
  },

  output: {
    filename: hmr ? "[name]-[hash].js" : "[name]-[chunkhash].js",
    chunkFilename: "[name]-[chunkhash].chunk.js",
    publicPath: output.publicPath,
    path: output.path,
  },

  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      libs: resolve(__dirname, "app", "libs"),
    },
    modules: ["client/app", "client/node_modules"],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
    new ManifestPlugin({
      publicPath: output.publicPath,
      writeToFileEmit: true,
    }),
  ],

  module: {
    rules: [
      {
        test: require.resolve("react"),
        use: {
          loader: "imports-loader",
          options: {
            shim: "es5-shim/es5-shim",
            sham: "es5-shim/es5-sham",
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]",
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
          "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false",
        ],
      },
    ],
  },
};

module.exports = config;

if (devBuild) {
  console.log("Webpack dev build for Rails"); // eslint-disable-line no-console
  module.exports.devtool = "eval-source-map";
} else {
  console.log("Webpack production build for Rails"); // eslint-disable-line no-console
}
