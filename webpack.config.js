const path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './app/browser.js',
  output:{
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/assets')
  },
  module: {
    rules: [
        //LOAD ALL files FROM ES6 TO ES5
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },

      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
};