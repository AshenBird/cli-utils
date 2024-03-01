import { getAbsolutePath } from "./path"
import { readJSONSync, writeJSONSync } from 'fs-extra/esm'
import type { JSONRecord } from "@mcswift/types"
export const getInfo = (root = './') => {
  const p = getAbsolutePath(root)
  const result = readJSONSync(`${p}/package.json`) as JSONRecord
  return result
}

export const setInfo = (content: JSONRecord, root = './') => {
  const p = getAbsolutePath(root)
  const result = writeJSONSync(`${p}/package.json`, content, {
    spaces: 2,
    EOL: '\n',
  })
  return result
}
