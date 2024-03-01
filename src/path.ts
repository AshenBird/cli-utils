import * as Path from 'node:path'
import { cwd } from 'node:process'
export const getAbsolutePath = (raw: string): string => {
  if (Path.isAbsolute(raw)) {
    return raw
  }
  return Path.resolve(cwd(), raw)
}