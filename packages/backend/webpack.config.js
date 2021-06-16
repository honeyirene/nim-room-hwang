const path = require('path');
const nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV || 'production';
const rootPath = path.resolve(__dirname);
const srcPath = path.resolve(rootPath, 'src');

const config = {
	entry: path.resolve(srcPath, 'index.ts'),
	target: 'node',
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
	},
	devtool: 'source-map',
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
	mode: env,
	resolve: {
		extensions: [".ts", ".js", ".json"],
	},
	externals: [nodeExternals({
		additionalModuleDirs: ['../../node_modules'],
		allowlist: ['@nrh/protocols'],
	})],
};

module.exports = config;
