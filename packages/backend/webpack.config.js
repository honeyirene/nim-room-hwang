const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'production';
const isLocal = !!process.env.isLocal;

const rootPath = path.resolve(__dirname);
const srcPath = path.resolve(rootPath, 'src');

function makePlugins() {
	const plugins = [
		new webpack.ProgressPlugin(),
	];

	if (env === 'development') {
		const plugins_development = [
			new ForkTsCheckerWebpackPlugin({
				tslint: false,
				useTypescriptIncrementalApi: true,
			}),
			new ForkTsCheckerNotifierWebpackPlugin({
				title: 'TypeScript',
				excludeWarnings: false,
			}),
		]
		for (const p of plugins_development) { plugins.push(p); }
	}

	if (isLocal) {
		plugins.push(new NodemonPlugin());
	}

	return plugins;
}

const config = {
	mode: env,
	entry: path.resolve(srcPath, 'index.ts'),
	target: 'node',
	devtool: 'source-map',
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{
				test: /\.(tsx?)$/,
				loader: 'ts-loader',
				exclude: [
					[
						path.resolve(__dirname, 'node_modules'),
						path.resolve(__dirname, '.webpack'),
					],
				],
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js", ".json"],
	},
	plugins: makePlugins(),
	externals: [nodeExternals({
		additionalModuleDirs: ['../../node_modules'],
		allowlist: ['@nrh/protocols'],
	})],
};

module.exports = config;
