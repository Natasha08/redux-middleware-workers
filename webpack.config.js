const path = require('path');
const webpack = require('webpack');
const debug = process.env.Node_ENV !== "production";

module.exports = {
  devtool: debug ? "inline-sourcemap": null,
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
      path: __dirname + '/public',
      filename: "bundle.js"
  },
  // port: '3001',
  // devServer: {
  //   hostname: '0.0.0.0'
  // },
  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDom': 'react-dom',
      'Redux': 'redux'
    })
  ],
  module: {
      loaders: [
        { test: /\.scss$/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        },

          { test: /\.css$/, loader: "styles!css" },
          {
              test: /\.js?$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                  presets: ['react', 'es2015'],
                  plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy', 'transform-react-jsx']
              }
          }
      ]
  },

  // resolve: {
  //   root: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src')]
  // }
};
