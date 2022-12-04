# Path fixxer

Npm package path fixer for chrome extensions

Path-fixxer reset virtaul-path("package name") to real path so that \
 chrome browser find this path.

## problem

When you try to add npm packages in chrome extension. \
chrome extension show error

> Import path must start with ./ or /

Path-fixxer fix this error

Example 1:
Get all npm packages with its real path in json file.\
Create path.js file. Add these lines

```js
import { pkgPathJson } from "path-fixxer";
pkgPathJson();
```

Run node path.js to create json file.

Example 2:
If you want to reset all npm packages' path in all files and directory.\
Add these lines

```js
import setAllPkgPath from "path-fixxer";
setAllPkgPath();
```

Example 3:
If you want to reset one npm package path in all files and directory.\
Add these lines

```js
import { realPath } from "path-fixxer";
setPkgPath("package_name");
```
