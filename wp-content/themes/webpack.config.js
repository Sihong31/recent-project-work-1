var webpack = require("webpack");

module.exports = {
	entry: './vascepatwentyseventeen/src/assets/js/main.js',
	output: { filename: './vascepatwentyseventeen/assets/js/main.min.js'},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
        			presets: ['es2015'],
      			}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	]
}
