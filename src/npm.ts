import { getAbsolutePath } from "./path";
import { readJSONSync, writeJSONSync } from "fs-extra/esm";
import type { JSONRecord } from "@mcswift/types";
const getInfo = (root = "./") => {
  const p = getAbsolutePath(root);
  const result = readJSONSync(`${p}/package.json`) as JSONRecord;
  return result;
};

const setInfo = (content: JSONRecord, root = "./") => {
  const p = getAbsolutePath(root);
  const result = writeJSONSync(`${p}/package.json`, content, {
    spaces: 2,
    EOL: "\n",
  });
  return result;
};

export class NpmPackage {
  root: string;
  constructor(root: string) {
    this.root = getAbsolutePath(root);
  }
  getInfo(){
    return NpmPackage.getInfo(this.root)
  }
  setInfo(content: JSONRecord){
    return NpmPackage.setInfo(content,this.root)
  }
  static getInfo = (root = "./") => {
    const p = getAbsolutePath(root);
    const result = readJSONSync(`${p}/package.json`) as JSONRecord;
    return result;
  };
  static setInfo = (content: JSONRecord, root = "./") => {
    const p = getAbsolutePath(root);
    const result = writeJSONSync(`${p}/package.json`, content, {
      spaces: 2,
      EOL: "\n",
    });
    return result;
  };
}
