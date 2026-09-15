import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration } from 'webpack';
import 'webpack-dev-server';

interface Env {
  [key: string]: unknown;
}

interface Argv {
  mode?: 'development' | 'production';
}

export default (_env: Env, argv: Argv): Configuration => {
  const isProduction = argv.mode === 'production';

  const cssInjectionLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    entry: path.resolve(__dirname, 'src/app/index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
      publicPath: '/',
      clean: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
        },
        {
          test: /\.module\.css$/,
          use: [
            cssInjectionLoader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  namedExport: false,
                  localIdentName: isProduction
                    ? '[hash:base64:8]'
                    : '[name]__[local]___[hash:base64:5]',
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [cssInjectionLoader, 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
      }),
      ...(isProduction
        ? [new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' })]
        : []),
    ],
    devServer: {
      port: 3000,
      open: true,
      hot: true,
    },
  };
};
