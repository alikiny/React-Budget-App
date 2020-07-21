
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {

const isProduction= env==="production"
  return {
    entry: './src/index.js',
    //entry:'./src/test/selector.test.js',
    output: {

      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader,},
          'css-loader',
          'sass-loader',
        ]
        
      }]

    },
    devtool: isProduction? 'source-map':'eval-cheap-module-source-map',
    devServer: {

      contentBase: path.join(__dirname, 'public'),
      compress: true,
      port: 9000,
      historyApiFallback: true
    },

    plugins: [
      new MiniCssExtractPlugin({
      filename: 'styles.css' }),
  ]
  }
}

