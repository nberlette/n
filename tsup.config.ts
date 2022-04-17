import { defineConfig, type Options } from 'tsup'
import type { BuildOptions } from 'esbuild'

export const config: Options = {
  dts: {
    banner: '/*! @brlt/n */',
  },
  format: ['cjs', 'esm'],
  outDir: 'dist',
  platform: 'node',
  onSuccess: 'esno scripts/postbuild.ts',
  entry: ['./src/index.ts', './src/cmd/*.ts'],
  skipNodeModulesBundle: true,
  sourcemap: true,
  minify: true,
  clean: true,
}
export default defineConfig(config)