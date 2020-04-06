const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.[hash].js',
	},
	devServer: {
		contentBase: './dist',
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader',
				],
			},
		],
	},
    plugins: [
    	new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
            title: 'Frontend Modules',
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        })
	],
	externals: {
		jquery: 'jQuery',
		lodash : {
			commonjs: 'lodash',
			amd: 'lodash',
			root: '_' // indicates global variable
		}
	}
};