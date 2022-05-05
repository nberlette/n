import * as _findup from 'find-up'
import _fs from 'fs-extra'
import _path from 'path'

const { findUp } = _findup
const { resolve } = _path
const { existsSync, readJsonSync } = _fs

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
