import * as ChildProcess from 'node:child_process'
import { getCommandFile } from './command'
import { cwd as _cwd } from 'node:process'
export const generatorDeclare = async (
  inputDir: string,
  outDir: string,
  root: string = _cwd(),
  tsconfig:string = "./tsconfig.json",
) => {
  const tscPath = getCommandFile('tsc', root)
  ChildProcess.execSync(
    [
      tscPath,
      `--rootDir ${inputDir}`,
      `--outDir ${outDir}`,
      `-p ${tsconfig}`,
      '--declaration',
      `--emitDeclarationOnly`
    ].join(' '),
    {
      cwd: root,
      stdio: 'inherit',
    }
  )
  return
}
