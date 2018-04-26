var webpack = require('webpack');
module.exports = {
	entry: './server/server.js',
	output: {filename: 'bundle.js',
			 sourceMapFilename: 'bundle.map'
			},
	devtool:'#source-map',
	module: {
		rules: [
			{
			 test: /\.js$/,
			 loader: 'babel-loader', 
			 exclude: /node_modules/,
			 query: {
			 	presets: ['env']
			 }
			}
		]
	},
	target: 'node'
};