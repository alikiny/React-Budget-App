
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {

  const isProduction = env === "production"
  return {
    entry: './src/index.js',
    //entry:'./src/test/selector.test.js',
    output: {

      path: path.join(__dirname, 'public','dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [

        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },

        { test: /\.s?css$/,
          use: [
            
            MiniCssExtractPlugin.loader,

            //set the sourceMap for css-loader and scss-loader. By default, these are false
            
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },

            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            },

          ]

        }
      ]

    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {

      contentBase: path.join(__dirname, 'public'),
      compress: true,
      port: 9000,
      historyApiFallback: true,
      publicPath:"/dist/"
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),
    ]
  }
}

