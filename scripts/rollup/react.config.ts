import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name } = getPackageJSON('react');
const pkgPath = resolvePkgPath(name);
const pkgDistPath = resolvePkgPath(name, true);

const basePlugins = getBaseRollupPlugins();

export default [
	{
		input: `${pkgPath}/index.ts`, // 输入
		// 输出
		output: {
			file: `${pkgDistPath}/index.js`,
			name: 'index.js',
			format: 'umd'
			// umd优点
			// 兼容多种加载系统和环境，包括浏览器环境和Node.js环境
			// 支持多种加载方式，包括全局变量、AMD和CJS
		},
		plugins: [
			...basePlugins,
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	}
	// jsx-runtime
	// {
	// 	input: `${pkgPath}/src/jsx.ts`,
	// 	output: [
	// 		{
	// 			file: `${pkgDistPath}/jsx-dev-runtime.js`,
	// 			name: 'jsx-dev-runtime.js',
	// 			format: 'umd'
	// 		},
	// 		{
	// 			file: `${pkgDistPath}/jsx-runtime.js`,
	// 			name: 'jsx-runtime.js',
	// 			format: 'umd'
	// 		}
	// 	],
	// 	plugins: basePlugins
	// }
];
