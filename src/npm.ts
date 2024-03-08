import { getAbsolutePath } from "./path";
import { readJSONSync, writeJSONSync } from "fs-extra/esm";
import type { JSONRecord } from "@mcswift/types";

export class NpmPackage {
  root: string;
  constructor(root: string) {
    this.root = getAbsolutePath(root);
  }
  private cache:JSONRecord|null = null
  get name(){
    if(this.cache)return this.cache.name||undefined
  }
  getInfo(){
    this.cache = NpmPackage.getInfo(this.root)
    Object.seal(this.cache)
    return this.cache
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
