var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import * as ChildProcess from "node:child_process";
import { getCommandFile } from "./command";
import { cwd as _cwd } from "node:process";
const generatorDeclare = (_0, _1, ..._2) => __async(void 0, [_0, _1, ..._2], function* (inputDir, outDir, root = _cwd(), tsconfig = "./tsconfig.json") {
  const tscPath = getCommandFile("tsc", root);
  ChildProcess.execSync(
    [
      tscPath,
      `--rootDir ${inputDir}`,
      `--outDir ${outDir}`,
      `-p ${tsconfig}`,
      "--declaration",
      `--emitDeclarationOnly`
    ].join(" "),
    {
      cwd: root,
      stdio: "inherit"
    }
  );
  return;
});
export {
  generatorDeclare
};
