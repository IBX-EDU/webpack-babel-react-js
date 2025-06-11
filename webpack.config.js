// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

console.log('Starting Webpack configuration...');

console.log("Using Node.js version: ", process.versions.node);

console.log("Node.js Dependencies: ", process.versions);

// Check if the environment is production or development
// This can be set using the --mode flag or NODE_ENV variable
const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

// Log the environment and variables for debugging
console.log('Environment Variables:', JSON.stringify(process.env, null, 2));

const config = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  optimization: {
    minimizer: [
        new CssMinimizerPlugin()
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
    extensions: [".jsx", ".js"],
  },
};

module.exports = (vars) => {
  // Log Webpack received variables
  console.log('Webpack received variables:', JSON.stringify(vars, null, 2));

    if (isProduction) {
        console.log('Building for production...');
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
        
    } else {
        console.log('Building for development...');
        config.mode = 'development';
    }
    return config;
};
