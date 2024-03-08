var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { getAbsolutePath } from "./path";
import { readJSONSync, writeJSONSync } from "fs-extra/esm";
const _NpmPackage = class _NpmPackage {
  constructor(root) {
    __publicField(this, "root");
    __publicField(this, "cache", null);
    this.root = getAbsolutePath(root);
  }
  get name() {
    if (this.cache)
      return this.cache.name || void 0;
  }
  getInfo() {
    this.cache = _NpmPackage.getInfo(this.root);
    Object.seal(this.cache);
    return this.cache;
  }
  setInfo(content) {
    return _NpmPackage.setInfo(content, this.root);
  }
};
__publicField(_NpmPackage, "getInfo", (root = "./") => {
  const p = getAbsolutePath(root);
  const result = readJSONSync(`${p}/package.json`);
  return result;
});
__publicField(_NpmPackage, "setInfo", (content, root = "./") => {
  const p = getAbsolutePath(root);
  const result = writeJSONSync(`${p}/package.json`, content, {
    spaces: 2,
    EOL: "\n"
  });
  return result;
});
let NpmPackage = _NpmPackage;
export {
  NpmPackage
};
