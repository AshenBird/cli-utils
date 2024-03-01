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
export {
  getInfo,
  setInfo
};
