import {p} from "@antfu/utils";
import {existsSync as exists} from "fs";
import {mkdir, readdir, writeFile} from "fs/promises";
import {basename, resolve} from "path";
import pkg from "../package.json";

const debug: boolean = true // (process?.env?.NODE_ENV === 'development')
const { time, timeLog, timeEnd } = console

async function main(): Promise<void> {
  debug && time('build')
  const newPkg: Record<string, any> = Object.assign({}, pkg)
  const bin: Record<string, string> = {}
  let binContent: string, binAbsPath: string
  const binDir = resolve(__dirname, '../bin')
  if (!exists(binDir)) await mkdir(binDir, { recursive: true })

  const files = p<string>(await readdir(resolve(__dirname, '../src/cmd')), { concurrency: 5 })
  await files.filter((file: string) => /\.ts$/ig.test(file))
    .map<Promise<any>>(async (file: string): Promise<any> => {
      const cmd = basename(file, '.ts')

      // ./bin/{cmd}.js
      bin[cmd] = `bin/${cmd}.js`
      binAbsPath = resolve(__dirname, '../', bin[cmd])
      binContent = `#!/usr/bin/env node\n/*! ${pkg.name}/${cmd} */\n'use strict'\nrequire('../dist/${cmd}')\n`
      await writeFile(binAbsPath, binContent, 'utf8')
      debug && timeLog('build', `${binContent.length}B -> ./${bin[cmd]}`)

      // pkg.bin
      newPkg.bin[cmd] = bin[cmd]
      debug && timeLog('build', `${cmd} ~> pkg.bin`)

      // pkg.exports
      const exports = {
        types: `./dist/${cmd}.d.ts`,
        import: `./dist/${cmd}.mjs`,
        require: `./dist/${cmd}.js`
      }
      newPkg.exports[`./${cmd}`] = exports
      debug && timeLog('build', `${cmd} ~> pkg.exports`)

      // pkg.files
      const files = [bin[cmd], ...Object.values(exports)]
      newPkg.files = [...new Set([...newPkg.files, ...files])]
      debug && timeLog('build', `${cmd} ~> pkg.files`)

      // return file paths Object
      return ({ bin: bin[cmd], ...exports })
    })
    .then(async () => {
      const newPkgJson = JSON.stringify(newPkg, null, 2)
      await writeFile(resolve(__dirname, '../package.json'), newPkgJson, 'utf8')
      if (debug) {
        timeLog('build', `${newPkgJson.length}B -> to package.json`)
        timeEnd('build')
      }
    })
}
main()