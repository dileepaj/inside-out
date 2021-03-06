const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV || 'development';
const NODEMODULES = path.resolve(__dirname, 'node_modules');

const config = {
   entry: path.resolve(__dirname, './public/main.js'),
	
   output: {
      filename: path.resolve(__dirname, 'public/build/bundle.js'),
   },
	
   devServer: {
      inline: true,
      publicPath: '/public/',
      port: 3000
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: NODEMODULES,
            loader: 'babel',
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   },
   watch: true
}

module.exports = config;