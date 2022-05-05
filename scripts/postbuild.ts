import { p } from "@antfu/utils"
import {
  existsSync as exists,
  mkdir,
  readdir,
  readFile,
  readJson,
  writeFile,
  writeJson,
  rm,
  chmod
} from "fs-extra"
import { basename, resolve } from "path"
// import pkg from "../package.json"

const debug: boolean = true // (process?.env?.NODE_ENV === 'development')
const { time, timeLog, timeEnd } = console

async function main(): Promise<void> {
  const pkg = await readJson(resolve(__dirname, '../package.json')).catch(() => ({}))

  debug && time('build')
  const newPkg: Record<string, any> = Object.assign({}, pkg)
  const bin: Record<string, string> = {}
  let binContent: string, binAbsPath: string
  let cjsContent: string, cjsAbsPath: string
  let exports: Record<string, any>
  const binDir = resolve(__dirname, '../bin')

  if (!exists(binDir))
    await mkdir(binDir, { recursive: true })

  const files = p<string>(await readdir(resolve(__dirname, '../src')), { concurrency: 5 })

  await files.filter(f => /^(?:[^/]+[/])*(n(?:[abdhiloprtuv]|ci|ex|ls|un)|index)\.ts$/.test(f))
    .map<Promise<any>>(async (file: string): Promise<any> => {
      const cmd = basename(file, '.ts')

      // dist/{cmd}.js
//       cjsAbsPath = resolve(__dirname, '../dist/', `${cmd}.js`)
//       cjsContent = `'use strict'
// module.exports = (...args) => new Promise((resolve, reject) => {
//   import('./${cmd}.mjs')
//     .then(m => resolve((m.default || m)(...args)))
//     .catch(reject)
// })
// `
//       await writeFile(cjsAbsPath, cjsContent, 'utf8')
      debug && timeLog('build', `${cjsContent.length}B -> ./dist/${cmd}.js (CJS)`)

      // ./bin/{cmd}.js
      bin[cmd] = `bin/${cmd}.js`
      if (cmd !== 'index' && ~Object.values(pkg.bin).indexOf(bin[cmd])) {
        binAbsPath = resolve(__dirname, '../', bin[cmd])
        binContent = `#!/usr/bin/env node
'use strict'
require('../dist/${cmd}')
`
        await writeFile(binAbsPath, binContent, 'utf8')
        // chmod to allow execute by all users
        await chmod(binAbsPath, 755)
        debug && timeLog('build', `${binContent.length}B -> ./bin/${cmd}.js (BIN)`)

        // pkg.bin
        newPkg.bin = newPkg.bin || {}
        newPkg.bin[cmd] = bin[cmd]
        debug && timeLog('build', `${cmd} ~> pkg.bin`)

        // dist/{cmd}.d.ts
        const dtsPath = resolve(__dirname, '../dist/', `${cmd}.d.ts`)
        // super ghetto way to check for an empty .d.ts file 
        const hasTypes = ((await readFile(dtsPath, 'utf8')).replace(/[\r\n\t\s ]/g, '').length > 0)
        if (!hasTypes) await rm(dtsPath, { force: true })
        // pkg.exports
        exports = {
          ...(hasTypes ? { types: `./dist/${cmd}.d.ts` } : {}),
          import: `./dist/${cmd}.mjs`,
          require: `./dist/${cmd}.js`
        }
        newPkg.exports[`./${cmd}`] = exports
        debug && timeLog('build', `${cmd} ~> pkg.exports`)
      }
      // pkg.files
      // const files = [bin[cmd], ...Object.values(exports)]
      // newPkg.files = [...new Set([...newPkg.files, ...files])]
      // debug && timeLog('build', `${cmd} ~> pkg.files`)

      // move file from dist/cmd to dist/
      // await $`mv -f ${resolve(__dirname, '../dist/cmd')}/* ${resolve(__dirname, '../dist')}`
      // // remove empty dist/cmd folder
      // await $`rm -rf ${resolve(__dirname, '../dist/cmd')}`

      // return file paths Object
      return ({ bin: bin[cmd], ...exports })
    })
    .then(async () => {
      const newPkgJson = JSON.stringify(newPkg, null, 2)
      await writeJson(resolve(__dirname, '../package.json'), newPkg, { spaces: 2 })
      if (debug) {
        timeLog('build', `${newPkgJson.length}B -> to package.json`)
        timeEnd('build')
      }
    })

}
main()
