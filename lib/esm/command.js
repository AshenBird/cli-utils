import { getAbsolutePath } from "./path";
import * as Path from "node:path";
import * as FileSystem from "fs";
const getCommandFile = (command, root = "./") => {
  const p = getAbsolutePath(root);
  let filePath = "";
  const dir = Path.join(p, "node_modules", ".bin");
  const dirents = FileSystem.readdirSync(dir, {
    withFileTypes: true
  });
  for (const dirent of dirents) {
    if (dirent.name !== command)
      continue;
    filePath = Path.join(dir, dirent.name);
    break;
  }
  return filePath;
};
export {
  getCommandFile
};
