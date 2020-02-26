const path = require('path');
const webpack = require('webpack');
// module.exports = {
//   mode: 'development',
//   entry: path.resolve(__dirname, './server/index.js'),
//   output: {
//     path: path.resolve(__dirname),
//     filename: 'server.bundle.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js[x]?/s,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-react', '@babel/preset-env'],
//             plugins: ["@babel/plugin-proposal-class-properties"]
//           }
//         }
//       },
//       {
//         test: /\.(scss|css)$/,
//         loaders: ['style-loader', 'css-loader'],
//       }
//     ],
//   },
//   node: {
//     fs: 'empty'
//   },
//   resolve: {
//     extensions: ['.js', '.jsx']
//   }
// };
const Config = (entry, name, target, path) => {
  return {
    entry, 
    target,
    output: {
      path,
      filename: `bundle.${name}.js`
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.js[x]?/s,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: ["@babel/plugin-proposal-class-properties"]
            }
          }
        },
        {
          test: /\.(scss|css)$/,
          loaders: ['style-loader', 'css-loader'],
        }
      ],
    },
    node: {
      fs: 'empty',
      __dirname: false,
      __filename: false,
    
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
      new webpack.IgnorePlugin(/^pg-native$/)
    ]
  }
}

const clientEntry = path.resolve(__dirname, "./client/src/index.jsx")
const clientPath = path.resolve(__dirname, "./client/dist");
const clientConfig = Config(clientEntry, "main", "web", clientPath);

const serverEntry = path.resolve(__dirname, "server/index.js");
const serverPath = path.resolve(__dirname, 'server');
const serverConfig = Config(serverEntry, "server", "node", serverPath);
module.exports = [serverConfig, clientConfig];