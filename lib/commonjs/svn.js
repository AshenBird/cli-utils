var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { getAbsolutePath } from "./path";
import { execSync } from "node:child_process";
import * as Path from "node:path";
const update = (root = "./") => {
  const p = getAbsolutePath(root);
  execSync(`cd ${p} && svn update`, { encoding: "utf-8" });
};
const commit = (fileList, message, root = "./") => {
  const p = getAbsolutePath(root);
  execSync(
    `cd ${p} && svn commit ${fileList.join(" ")} -m '${message}' --depth empty`,
    { encoding: "utf-8" }
  );
};
const getStatus = (root = "./") => {
  const p = getAbsolutePath(root);
  const svnStatusRaw = execSync(`cd ${p} && svn st`, { encoding: "utf-8" });
  const statusList = svnStatusRaw.split("\n").map((line) => line.split(" ").filter((i) => !!i && i !== " "));
  const result = {
    counts: {
      total: 0
    },
    status: [],
    raw: svnStatusRaw
  };
  for (const [type, path] of statusList) {
    if (!type)
      continue;
    result.status.push({
      type,
      path,
      absolute: Path.join(p, path)
    });
    result.counts.total += 1;
    if (result.counts[type]) {
      result.counts[type] += 1;
      continue;
    }
    result.counts[type] = 1;
  }
  return result;
};
const getRevision = (root = "./") => {
  const p = getAbsolutePath(root);
  return getInfo(p).Revision;
};
const getInfo = (root = "./") => {
  const p = getAbsolutePath(root);
  const svnInfoRaw = execSync(`cd ${p} && svn info`, { encoding: "utf-8" });
  const infoList = svnInfoRaw.split("\n").map((line) => {
    return line.split(":").map((i) => i.trim());
  });
  const result = {};
  for (const [k, v] of infoList) {
    result[k.split(" ").join("")] = v;
  }
  result.raw = svnInfoRaw;
  return result;
};
class Svn {
  static get info() {
    return getInfo();
  }
  static get revision() {
    return getRevision();
  }
  static get status() {
    return getStatus();
  }
}
__publicField(Svn, "commit", commit);
__publicField(Svn, "update", update);
var svn_default = Svn;
export {
  Svn,
  svn_default as default
};
