const path = require('path');
const nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV || 'production';

const config = {
	entry: './src/index.ts',
	target: 'node',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'build'),
	},
	devtool: 'source-map',
	module: {
		rules: [
			{ test: /\.ts$/, loader: 'ts-loader' },
		],
	},
	mode: env,
	resolve: {
		extensions: [".ts", ".js", ".json"],
	},
	externals: [nodeExternals({
		additionalModuleDirs: ['../../node_modules'],
		allowlist: [
			'@nrh/protocols',
		],
	})],
};

module.exports = config;
