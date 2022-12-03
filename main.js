//@ts-check
//esm module import
import { platform } from "node:os";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { clr } from "./util.js";

const execute = promisify(exec);
const os = platform();

const copyCmd = {
	windows: (path) => `echo "${path}" | clip`,
	darwin: (path) => `echo "${path}" | pbcopy`,
	linux: (path) => `echo "${path}" | xclip -sel clip -r`,
};

const replaceCmd = {
	windows: (pkgName, path) => `where /r '${pkgName}' | xargs type '/${pkgName}/${path}/g'`,
	darwin: (pkgName, path) => `grep -rl '${pkgName}' | xargs sed -i 's/${pkgName}/${path}/g'`,
	linux: (pkgName, path) => `grep -rl '${pkgName}' | xargs sed -i 's/${pkgName}/${path}/g'`,
};

async function getPkgPath(npmPkg) {
	//find module path
	const fullPath = await import.meta.resolve(npmPkg);
	return fullPath.match(/(\/node_modules.*)/)[0];
}

export async function setPkgPath(npmPkg) {
	const path = await getPkgPath(npmPkg);

	const { stdout, stderr } = await execute(replaceCmd[os](npmPkg, path));
	if (stderr) throw new Error(stderr);
	console.log(clr["cyan"], npmPkg + " package path updated");
}

export async function realPath(npmPkg) {
	const path = await getPkgPath(npmPkg);
	console.log(path);
	return path;
}

export async function copyPath(npmPkg) {
	const path = await getPkgPath(npmPkg);

	const { stdout, stderr } = await execute(copyCmd[os](path));
	if (stderr) throw new Error(stderr);
	console.log("module path copied. Paste anywhere");
}

export const setAllPkgPath = async () => {
	const pkgJson = (await import("package.json", { assert: { type: "json" } })).default;
	const dependencies = Object.keys(pkgJson.dependencies);
	let i = dependencies.length;
	while (i--) setPkgPath(dependencies[i]);
	console.log(clr["green"], i + " packages path updated");
};

export const pkgPathJson = async () => {
	const pkgJson = (await import("package.json", { assert: { type: "json" } })).default;
	console.log(pkgJson);
	const dependencies = Object.keys(pkgJson.dependencies);

	let promises = [];
	for (const key of dependencies) promises.push(getPkgPath(key));
	const results = await Promise.all(promises);
	const pkgPaths = {};
	let count = dependencies.length;
	for (let i = 0; i < count; i++) pkgPaths[dependencies[i]] = results[i];

	// for (const key of dependencies) dependencies[key] = await getPkgPath(key);

	const { writeFile } = await import("node:fs/promises");
	await writeFile("pkg-path.json", JSON.stringify(pkgPaths));

	console.log(clr["magenta"], " packages path json generated");
};

export default setAllPkgPath;
