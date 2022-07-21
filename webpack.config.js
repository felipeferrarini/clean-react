const path = require('path')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = env => ({
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src', 'main', 'index.tsx')
  },
  output: {
    path: path.join(__dirname, 'public/dist'),
    publicPath: '/public/dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node-modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    static: './public',
    port: 3000,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true
    }
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: `./.env.${env.file}`
    })
  ]
})
