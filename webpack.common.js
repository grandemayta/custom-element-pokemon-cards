const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const src = path.resolve(__dirname, './src');
const dist = path.resolve(__dirname, './dist');

module.exports = {
  entry: {
    app: [
      'whatwg-fetch',
      'promise-polyfill/dist/polyfill',
      '@webcomponents/custom-elements',
      `${src}/app/component.js`
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new CleanWebpackPlugin([dist])],
  resolve: {
    extensions: ['.js', '.scss'],
    modules: ['node_modules', 'src'],
    alias: {
      app: `${src}/app`,
      components: `${src}/app/components`
    }
  }
};
