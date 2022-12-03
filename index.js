/* const copyCmd = {
	windows: (path) => `echo "${path}" | clip`,
	darwin: (path) => `echo "${path}" | pbcopy`,
	linux: (path) => `echo "${path}" | xclip -sel clip -r`,
};

const replaceCmd = {
	windows: (pkgName, path) => `where /r '${pkgName}' | xargs type '/${pkgName}/${path}/g'`,
	darwin: (pkgName, path) => `grep -rl '${pkgName}' | xargs sed -i 's/${pkgName}/${path}/g'`,
	linux: (pkgName, path) => `grep -rl '${pkgName}' | xargs sed -i 's/${pkgName}/${path}/g'`,
};

if (!process.env.PKG) throw new Error("pkg name must be specified");
const pkgList = process.env.PKG.split(","); */

//esm module import
/* import { platform } from "node:os";
import { exec } from "node:child_process";
import { promisify } from "node:util";
const execute = promisify(exec);
const os = platform();
const replacePath = process.argv[3] === "--replace";

let i = pkgList.length;
while (i--) {
	const fullPath = await import.meta.resolve(pkgList[i]);
	// const fullPath = require.resolve(pkgList[i]);

	//find module path
	const path = fullPath.match(/(\/node_modules.*)/)[0];
	console.log("\x1b[36m%s\x1b[0m", path);
	//copy module path to clipboard

	const { stdout, stderr } = await execute(copyCmd[os](path));
	if (stderr) throw new Error(stderr);
	console.log("module path copied. Paste anywhere");

	//for replace modules path in all files inside all directory
	if (replacePath) {
		const { stdout, stderr } = await execute(replaceCmd[os](pkgList[i], path));
		if (stderr) throw new Error(stderr);
	}
}

async function copyPath(npmPkg) {
	const fullPath = await import.meta.resolve(pkgList[i]);
	const path = fullPath.match(/(\/node_modules.*)/)[0];

	const { stdout, stderr } = await execute(copyCmd[os](path));
	if (stderr) throw new Error(stderr);
	console.log("module path copied. Paste anywhere");
}
 */
