import * as FS from "node:fs"
import * as Path from "node:path"
export const getFileList = (path: string, result: string[] = []) => {
  const dirents = FS.readdirSync(path, { withFileTypes: true })
  for (const item of dirents) {
    const current = Path.join(path, item.name)
    if (item.isFile()) {
      result.push(current)
      continue
    }
    getFileList(current, result)
  }
  return result
}