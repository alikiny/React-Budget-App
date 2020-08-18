const webpack = require('webpack')
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* there are 2 env files under the root folder. These files contains
the configuration of firebase (coppy from the firebase hub), then 
rename the keys */
const env = process.env.NODE_ENV || 'development'

if (env === 'test') {
  require('dotenv').config({ path: '.env.test' })
} else {
  require('dotenv').config({ path: '.env.development' })
}

module.exports = (env) => {

  const isProduction = env === "production"
  return {
    entry: ['babel-polyfill','./src/index.js'],
    //entry:'./src/test/selector.test.js',
    output: {

      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [

        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },

        {
          test: /\.s?css$/,
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
      port: 4000,
      historyApiFallback: true,
      publicPath: "/dist/"
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),

      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY':JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_ID),
        'process.env.FIREBASE_API_ID': JSON.stringify(process.env.FIREBASE_API_ID),
        'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID),

      }),

    ]
  }
}

