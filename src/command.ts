import { getAbsolutePath } from "./path"
import * as Path from 'node:path'
import * as FileSystem from 'fs'

export const getCommandFile = (command: string, root = './') => {
  const p = getAbsolutePath(root)
  let filePath = ''
  const dir = Path.join(p, 'node_modules', '.bin')
  const dirents = FileSystem.readdirSync(dir, {
    withFileTypes: true,
  })
  // // 暂时只支持这 3 个平台
  // const plat = platform() as 'darwin' | 'linux' | 'win32'
  // if (!['darwin', 'linux', 'win32'].includes(plat)) {
  //   throw new Error(`目前不支持 ${plat} 平台`)
  // }
  for (const dirent of dirents) {
    // if (dirent.name.split('.')[0] !== command) return
    // filePath = Path.join(dir, dirent.name)
    if (dirent.name !== command) continue
    filePath = Path.join(dir, dirent.name)
    break
  }
  return filePath
}
