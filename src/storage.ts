
import { existsSync, readJsonSync, writeJson } from 'fs-extra'
import { join } from 'path'

export interface Storage {
  lastRunCommand?: string
}

let storage: Storage | undefined

const storagePath = join(__dirname, '_storage.json')

export async function load(fn?: (storage: Storage) => Promise<boolean> | boolean) {
  if (!storage && existsSync(storagePath))
    storage = await readJsonSync(storagePath).catch(() => ({})) || {}

  if (fn && (await fn(storage!)))
      await dump()

  return storage!
}

export const dump = async (): Promise<void> => storage && (await writeJson(storagePath, storage))