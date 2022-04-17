import { findUp } from 'find-up'
import { existsSync, readJsonSync } from 'fs-extra'
import { resolve } from 'path'

export function getPackageJSON(cwd = process.cwd()): any {
  const path = resolve(cwd, 'package.json')

  if (existsSync(path)) {
    try {
      return readJsonSync(path)
    } catch (e) {
      console.warn('Failed to parse package.json', e)
      process.exit(0)
    }
  }
}

export const findPackageJson = (): any =>
  (findUp('package.json').then((pkg: any) => pkg).catch(() => '') || '')
