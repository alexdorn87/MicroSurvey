var webpack = require("webpack");
var path = require('path');
module.exports = {
  entry: './tracker-client/src/main.js',
  output: {
    path: './tracker-client/lib',
    filename: 'client.min.js'
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel"
        //query: {
        //  cacheDirectory: true,
        //  presets: ['es2015']
        //}
      }
    ]
  }
};
