var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { getAbsolutePath } from "./path";
import { readJSONSync, writeJSONSync } from "fs-extra/esm";
const getInfo = (root = "./") => {
  const p = getAbsolutePath(root);
  const result = readJSONSync(`${p}/package.json`);
  return result;
};
const setInfo = (content, root = "./") => {
  const p = getAbsolutePath(root);
  const result = writeJSONSync(`${p}/package.json`, content, {
    spaces: 2,
    EOL: "\n"
  });
  return result;
};
const _NpmPackage = class _NpmPackage {
  constructor(root) {
    __publicField(this, "root");
    this.root = getAbsolutePath(root);
  }
  getInfo() {
    return _NpmPackage.getInfo(this.root);
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
