import { cwd } from "node:process";
import { generatorDeclare, log } from "../src";
import { build as _build } from 'esbuild'
import * as Path from 'node:path'
import * as FileSystem from 'fs-extra'
import * as FS from 'fs'
import { getFileList } from "../src"
log(`building`)
const root = cwd()
const lib = Path.join(root, 'lib')
const commonjs = Path.join(lib,"commonjs")
const esm = Path.join(lib,"esm")
const src = Path.join(root, 'src')
const build = async()=>{
  // 获得全部要构建的文件
  const fileList = getFileList(src)
  // 清空构建目录
  FileSystem.ensureDirSync(lib)
  FileSystem.emptyDirSync(lib)
  FileSystem.ensureDirSync(commonjs)
  FileSystem.ensureDirSync(esm)
  const tasks = []
  // 构建
  tasks.push(_build({
    entryPoints: fileList,
    platform: 'node',
    drop: ['debugger'],
    target: ['es2015'],
    bundle: false,
    outdir: commonjs,
    format: 'esm'
  }))
  tasks.push(_build({
    entryPoints: fileList,
    platform: 'node',
    drop: ['debugger'],
    target: ['es2015'],
    bundle: false,
    outdir: esm,
    format: 'esm'
  }))
  // 生成类型
  tasks.push(
    generatorDeclare('./src', './types', root,"tsconfig.lib.json")
  )
  await Promise.all(tasks)
  // const libFileList = getFileList(lib)
  // 清楚 buildInfo 文件
  const replaceTasks: Promise<void>[] = []
  // for (const libFilePath of libFileList) {
    // if (!libFilePath.endsWith('.tsbuildinfo'))continue;
    replaceTasks.push(FS.promises.rm(Path.join(cwd(),"tsconfig.lib.tsbuildinfo")))
  // }
  await Promise.all(replaceTasks)
  log(`has build`)
}
build()