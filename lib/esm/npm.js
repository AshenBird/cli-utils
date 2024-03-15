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
    return new Proxy(this, {
      get(target, p) {
        const r = Reflect.get(target, p);
        if (!r)
          return target.data[p];
        if (typeof r === "function") {
          return r.bind(target);
        }
        return r;
      }
    });
  }
  get data() {
    if (this.cache)
      return this.cache;
    return this.getPackageInfo();
  }
  getPackageInfo() {
    this.cache = _NpmPackage.getPackageInfo(this.root);
    Object.seal(this.cache);
    return this.cache;
  }
  setPackageInfo(key, value) {
    return _NpmPackage.setPackageInfo(key, value, this.root);
  }
};
__publicField(_NpmPackage, "getPackageInfo", (root = "./") => {
  const p = getAbsolutePath(root);
  const result = readJSONSync(`${p}/package.json`);
  return result;
});
__publicField(_NpmPackage, "setPackageInfo", (key, value, root = "./") => {
  const p = getAbsolutePath(root);
  const content = _NpmPackage.getPackageInfo(root);
  content[key] = value;
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
