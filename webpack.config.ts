import LoadablePlugin from '@loadable/webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import type { Configuration, WebpackPluginInstance } from 'webpack';
import nodeExternals from 'webpack-node-externals';

function getConfig(isServer: boolean): Configuration {
  const buildDirectory = path.resolve(__dirname, 'build', isServer ? 'server' : 'client');

  return {
    entry: isServer ? './src/server/index.ts' : './src/index.tsx',
    output: { path: buildDirectory },
    mode: 'development',
    target: isServer ? 'async-node' : 'web',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    externalsPresets: { node: true },
    ...(isServer && {
      externals: [nodeExternals()],
    }),
    module: {
      rules: [
        // {
        //   test: /\.jsx?$/,
        //   exclude: /node_modules/,
        // },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      ...(isServer ?
        [new CopyWebpackPlugin({
          patterns: [
            {
              from: './src/views',
              to: path.join(buildDirectory, 'views'),
            },
          ]
        })] : []),
      new LoadablePlugin() as WebpackPluginInstance,
    ],
  };
}

export default [getConfig(false), getConfig(true)];
