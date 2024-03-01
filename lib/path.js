import * as Path from "node:path";
import { cwd } from "node:process";
const getAbsolutePath = (raw) => {
  if (Path.isAbsolute(raw)) {
    return raw;
  }
  return Path.resolve(cwd(), raw);
};
export {
  getAbsolutePath
};
