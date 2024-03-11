import { getAbsolutePath } from "./path";
import { readJSONSync, writeJSONSync } from "fs-extra/esm";
import type { JSONRecord,NPM } from "@mcswift/types";

export class NpmPackage {
  root: string;
  constructor(root: string) {
    this.root = getAbsolutePath(root);
    return new Proxy(this,{
      get(target:any,p:string|symbol){
        const r = Reflect.get(target,p)
        if(!r)return target.data[p]
        if(typeof r === "function"){
          return r.bind(target)
        }
        return r
      }
    })
  }
  private cache:NPM.Package|null = null
  get data(){
    if(this.cache)return this.cache
    return this.getInfo();
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
