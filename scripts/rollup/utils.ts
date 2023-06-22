import path from 'path';
import fs from 'fs';

import ts from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import cjs from '@rollup/plugin-commonjs';

const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

export function resolvePkgPath(pkgName: any, isDist?: any) {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}
/**获取package.json */
export function getPackageJSON(pkgName: any) {
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(path, { encoding: 'utf-8' });
	return JSON.parse(str);
}
/**获取rollup plugins */
export function getBaseRollupPlugins({
	alias = {
		__LOG__: false,
		preventAssignment: true
	},
	typescript = {}
} = {}) {
	return [replace(alias), cjs(), ts(typescript)];
}
